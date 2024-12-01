// app/api/orders/feedback/route.ts
import { prisma } from '@/app/_lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tableNumber = parseInt(searchParams.get('tableNumber') || '0');
  const round = parseInt(searchParams.get('round') || '0');

  if (!tableNumber || !round) {
    return NextResponse.json(
      { error: 'Table number and round are required' },
      { status: 400 }
    );
  }

  try {
    // Get all orders for this table and round
    const orders = await prisma.order.findMany({
      where: {
        tableNumber: tableNumber,
        round: round
      },
      include: {
        items: {
          include: {
            menuItem: true
          }
        }
      }
    });

    if (!orders || orders.length === 0) {
      return NextResponse.json(
        { error: 'No orders found for this table and round' },
        { status: 404 }
      );
    }

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}