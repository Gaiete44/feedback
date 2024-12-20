// app/api/feedback/summary/route.ts
import { prisma } from '@/app/_lib/db';
import { NextResponse } from 'next/server';

interface FeedbackSummary {
  itemName: string;
  averageRating: number;
  totalRatings: number;
  comments: {
    rating: number;
    comment: string;
    date: Date | string;
  }[];
}

interface DateFilter {
  createdAt?: {
    gte: Date;
  };
}

// Adjust the interface to match Prisma's return type
interface FeedbackItem {
  menuItem: {
    id: string;
    createdAt: Date;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    updatedAt: Date;
  };
  id: string;
  menuItemId: string;
  orderId: string;
  rating: number;
  comment: string | null; // Update to match Prisma
  createdAt: Date;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeFilter = searchParams.get('timeFilter') || 'all';

  const dateFilter: DateFilter = {};
  const now = new Date();

  switch (timeFilter) {
    case 'day':
      dateFilter.createdAt = {
        gte: new Date(now.setHours(0, 0, 0, 0)),
      };
      break;
    case 'week':
      dateFilter.createdAt = {
        gte: new Date(now.setDate(now.getDate() - 7)),
      };
      break;
    case 'month':
      dateFilter.createdAt = {
        gte: new Date(now.setMonth(now.getMonth() - 1)),
      };
      break;
  }

  try {
    const feedback = await prisma.feedback.findMany({
      where: dateFilter,
      include: {
        menuItem: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Explicitly type feedback and curr as FeedbackItem
    const aggregated = feedback.reduce((acc: FeedbackSummary[], curr: FeedbackItem) => {
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
            date: curr.createdAt,
          });
        }
      } else {
        acc.push({
          itemName: curr.menuItem.name,
          averageRating: curr.rating,
          totalRatings: 1,
          comments: curr.comment
            ? [
                {
                  rating: curr.rating,
                  comment: curr.comment,
                  date: curr.createdAt,
                },
              ]
            : [],
        });
      }

      return acc;
    }, [] as FeedbackSummary[]);

    return NextResponse.json(aggregated);
  } catch (err) {
    console.error('Failed to fetch feedback summary:', err);
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
  }
}
