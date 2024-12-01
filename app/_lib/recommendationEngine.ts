// app/_lib/recommendationEngine.ts
import { prisma } from './db';
import { MenuItem } from '@/app/_types/menu';

interface RecommendationResult {
  menuItem: MenuItem;
  score: number;
  reason: string;
}

export async function getPostFeedbackRecommendations(
  orderId: string
): Promise<RecommendationResult[]> {
  try {
    // Get the current order's feedback and items
    const currentOrderFeedback = await prisma.feedback.findMany({
      where: { orderId },
      include: { menuItem: true },
    });

    // Get all menu items
    const allMenuItems = await prisma.menuItem.findMany();

    // Create a map of the user's ratings from this order
    const userPreferences = new Map<string, number>();
    currentOrderFeedback.forEach((feedback) => {
      userPreferences.set(feedback.menuItem.category, feedback.rating);
    });

    // Track items already ordered to exclude them
    const orderedItemIds = currentOrderFeedback.map((f) => f.menuItemId);

    // Calculate scores for each potential recommendation
    const recommendations = await Promise.all(
      allMenuItems
        .filter((item) => !orderedItemIds.includes(item.id))
        .map(async (item) => {
          let score = 0;
          let reason = '';

          // 1. Category preference (based on ratings of items in the same category)
          const categoryRating = userPreferences.get(item.category) || 0;
          if (categoryRating > 0) {
            score += categoryRating * 0.4; // 40% weight for category preference
            if (categoryRating >= 4) {
              reason = `Based on your high rating of ${item.category.toLowerCase()} dishes`;
            }
          }

          // 2. Similar items preference (items frequently ordered together)
          const similarOrdersCount = await prisma.order.count({
            where: {
              items: {
                some: {
                  menuItemId: item.id,
                  order: {
                    items: {
                      some: {
                        menuItemId: {
                          in: orderedItemIds,
                        },
                      },
                    },
                  },
                },
              },
            },
          });

          if (similarOrdersCount > 0) {
            score += Math.min(similarOrdersCount * 0.3, 2); // 30% weight for popular combinations
            if (!reason) {
              reason = 'Often ordered with similar dishes';
            }
          }

          // 3. Overall popularity and ratings (30% weight)
          const ratings = await prisma.feedback.findMany({
            where: { menuItemId: item.id },
          });

          if (ratings.length > 0) {
            const avgRating =
              ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
            score += avgRating * 0.3;
            if (!reason && avgRating >= 4.5) {
              reason = 'Highly rated by other customers';
            }
          }

          return {
            menuItem: item,
            score,
            reason: reason || 'You might enjoy this',
          } as RecommendationResult;
        })
    );

    // Sort by score and return top 4
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [];
  }
}