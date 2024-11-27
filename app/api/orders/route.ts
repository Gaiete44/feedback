// app/api/orders/route.ts
import { prisma } from '@/app/_lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  
  try {
    // Validate round and orders per person
    const existingOrders = await prisma.order.count({
      where: {
        tableNumber: data.tableNumber,
        round: data.round,
        personNumber: data.personNumber
      }
    });

    if (existingOrders >= 3) {
      return NextResponse.json(
        { error: 'Maximum orders reached for this person in current round' }, 
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        tableNumber: data.tableNumber,
        round: data.round,
        personNumber: data.personNumber,
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

// Get orders for a specific table and round
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tableNumber = searchParams.get('tableNumber');
  const round = searchParams.get('round');

  if (!tableNumber || !round) {
    return NextResponse.json(
      { error: 'Table number and round are required' }, 
      { status: 400 }
    );
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        tableNumber: parseInt(tableNumber),
        round: parseInt(round)
      },
      include: {
        items: {
          include: {
            menuItem: true
          }
        }
      }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' }, 
      { status: 500 }
    );
  }
}