// app/api/orders/route.ts
import { prisma } from '@/app/_lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
<<<<<<< HEAD
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
=======
    const order = await prisma.order.create({
      data: {
        total: data.total,
>>>>>>> parent of a498088 (round system)
        items: {
          create: data.items.map((item: { menuItemId: string }) => ({
            menuItemId: item.menuItemId,
            quantity: 1
          }))
        }
      }
    });
<<<<<<< HEAD

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
=======
    return NextResponse.json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
>>>>>>> parent of a498088 (round system)
  }
}