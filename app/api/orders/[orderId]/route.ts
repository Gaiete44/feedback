// app/api/orders/[orderId]/route.ts
import { prisma } from '@/app/_lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: { orderId: string } }
) {
  const orderId = await Promise.resolve(context.params.orderId);

  try {
    const order = await prisma.order.findUnique({
      where: { 
        id: orderId 
      },
      include: {
        items: {
          include: {
            menuItem: true
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' }, 
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (err) {
    console.error('Failed to fetch order:', err);
    return NextResponse.json(
      { error: 'Failed to fetch order' }, 
      { status: 500 }
    );
  }
}