// app/api/feedback/route.ts
import { prisma } from '@/app/_lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  
  try {
    // Find the order for this table, round, and menu item
    const order = await prisma.order.findFirst({
      where: {
        tableNumber: data.tableNumber,
        round: data.round,
        items: {
          some: {
            menuItemId: data.menuItemId
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

    const feedback = await prisma.feedback.create({
      data: {
        menuItemId: data.menuItemId,
        orderId: order.id,
        rating: data.rating,
        comment: data.comment
      },
      include: {
        menuItem: true,
        order: true
      }
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Feedback creation error:', error);
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}