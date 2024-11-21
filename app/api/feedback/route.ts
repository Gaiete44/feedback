// app/api/feedback/route.ts
import { prisma } from '@/app/_lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  
  try {
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
  }
}