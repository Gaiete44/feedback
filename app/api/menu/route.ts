// app/api/menu/route.ts
import { prisma } from '@/app/_lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany();
    return NextResponse.json(menuItems);
  } catch (err) {
    console.error('Failed to fetch menu items:', err);
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
  }
}
