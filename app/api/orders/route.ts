// app/api/orders/route.ts
import { prisma } from '@/app/_lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate the incoming data
    if (!data.tableNumber || !data.round || !Array.isArray(data.items)) {
      return NextResponse.json(
        { error: 'Invalid order data' },
        { status: 400 }
      );
    }

    // Create the order with all its items
    const order = await prisma.order.create({
      data: {
        tableNumber: parseInt(data.tableNumber),
        round: parseInt(data.round),
        total: parseFloat(data.total),
        items: {
          create: data.items.map((item: { menuItemId: string }) => ({
            menuItemId: item.menuItemId,
            quantity: 1
          }))
        }
      }
    });

    return new NextResponse(JSON.stringify({ success: true, orderId: order.id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error creating order:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to create order' }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}