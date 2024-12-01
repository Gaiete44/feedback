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
<<<<<<< HEAD
    // Get the previous round's orders for this table
    const previousRound = round - 1;
    
    // If this is the first round, there's no feedback to give
    if (previousRound < 1) {
      return NextResponse.json([]);
    }

    const orders = await prisma.order.findMany({
      where: {
        tableNumber: tableNumber,
        round: previousRound
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
=======
    const feedback = await prisma.feedback.create({
      data: {
        menuItemId: data.menuItemId,
        orderId: data.orderId,
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
    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
>>>>>>> parent of a498088 (round system)
  }
}