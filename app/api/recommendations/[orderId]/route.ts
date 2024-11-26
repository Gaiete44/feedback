// app/api/recommendations/[orderId]/route.ts
import { NextResponse } from 'next/server';
import { getPostFeedbackRecommendations } from '@/app/_lib/recommendationEngine';

export async function GET(
  req: Request,
  context: { params: Promise<{ orderId: string }> }
) {
  try {
    const recommendations = await getPostFeedbackRecommendations(
      (await context.params).orderId
    );
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error('Recommendations error:', error);
    return NextResponse.json(
      { error: 'Failed to get recommendations' },
      { status: 500 }
    );
  }
}