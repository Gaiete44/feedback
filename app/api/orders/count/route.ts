// app/api/orders/count/route.ts
import { prisma } from '@/app/_lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tableNumber = parseInt(searchParams.get('tableNumber') || '0');
  const round = parseInt(searchParams.get('round') || '0');

  if (!tableNumber || !round) {
    return NextResponse.json({ count: 0 });
  }

  try {
    // Count items in current round for this table
    const orders = await prisma.order.findMany({
      where: {
        tableNumber: tableNumber,
        round: round,
      },
      select: {
        _count: {
          select: {
            items: true
          }
        }
      }
    });

    // Sum up all items from all orders in this round
    const totalItems = orders.reduce((sum, order) => sum + order._count.items, 0);

    return NextResponse.json({ count: totalItems });
  } catch (error) {
    console.error('Error checking order count:', error);
    return NextResponse.json({ count: 0 });
  }
}