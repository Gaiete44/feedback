// app/api/orders/route.ts
import { prisma } from '@/app/_lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  
  try {
    const order = await prisma.order.create({
      data: {
        total: data.total,
        items: {
          create: data.items.map((item: { menuItemId: string; quantity: number }) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity
          }))
        }
      }
    });
    return NextResponse.json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}