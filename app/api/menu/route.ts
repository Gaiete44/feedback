// app/api/menu/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/app/_lib/db';

export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany();
    
    return new NextResponse(JSON.stringify(menuItems), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=599',
      },
    });
  } catch (err) {
    console.error('Failed to fetch menu items:', err);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch menu items' }), 
      { status: 500 }
    );
  }
}