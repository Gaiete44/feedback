// app/api/feedback/summary/route.ts
import { prisma } from '@/app/_lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeFilter = searchParams.get('timeFilter') || 'all';

  const now = new Date();
  const dateFilter: { createdAt?: { gte: Date } } = {};

  // Set the date filter based on the selected time period
  switch (timeFilter) {
    case 'day': {
      const startOfDay = new Date(now);
      startOfDay.setHours(0, 0, 0, 0);
      dateFilter.createdAt = { gte: startOfDay };
      break;
    }
    case 'week': {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - 7);
      dateFilter.createdAt = { gte: startOfWeek };
      break;
    }
    case 'month': {
      const startOfMonth = new Date(now);
      startOfMonth.setMonth(now.getMonth() - 1);
      dateFilter.createdAt = { gte: startOfMonth };
      break;
    }
    // 'all' case doesn't need a date filter
  }

  try {
    const feedback = await prisma.feedback.findMany({
      where: dateFilter,
      include: {
        menuItem: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Process and aggregate the feedback
    const aggregated = feedback.reduce((acc: any[], curr) => {
      const existing = acc.find(item => item.itemName === curr.menuItem.name);
      
      if (existing) {
        existing.totalRatings++;
        existing.averageRating = (
          (existing.averageRating * (existing.totalRatings - 1) + curr.rating) / 
          existing.totalRatings
        );
        if (curr.comment) {
          existing.comments.push({
            rating: curr.rating,
            comment: curr.comment,
            date: curr.createdAt
          });
        }
      } else {
        acc.push({
          itemName: curr.menuItem.name,
          averageRating: curr.rating,
          totalRatings: 1,
          comments: curr.comment ? [{
            rating: curr.rating,
            comment: curr.comment,
            date: curr.createdAt
          }] : []
        });
      }
      
      return acc;
    }, []);

    return NextResponse.json(aggregated);
  } catch (err) {
    console.error('Failed to fetch feedback summary:', err);
    return NextResponse.json(
      { error: 'Failed to fetch feedback summary' }, 
      { status: 500 }
    );
  }
}