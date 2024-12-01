'use client'

import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { useRouter } from 'next/navigation';
import { useTable } from '@/app/_context/TableContext';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  vegan: boolean;
  vegetarian: boolean;
  glutenFree: boolean;
  nutFree: boolean;
  dairyFree: boolean;
  spicy: boolean;
}
=======
import { useParams, useRouter } from 'next/navigation';
import { MenuCard } from '@/app/_components/MenuCard';
import { getColorScheme } from '@/app/_lib/menuColors';
>>>>>>> parent of a498088 (round system)

interface OrderItem {
  menuItemId: string;
  menuItem: {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    image: string;
    vegan: boolean;
    vegetarian: boolean;
    glutenFree: boolean;
    nutFree: boolean;
    dairyFree: boolean;
    spicy: boolean;
  };
  quantity: number;
}

interface Recommendation {
  menuItem: {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    image: string;
    vegan: boolean;
    vegetarian: boolean;
    glutenFree: boolean;
    nutFree: boolean;
    dairyFree: boolean;
    spicy: boolean;
  };
  score: number;
  reason: string;
}

export default function FeedbackPage() {
  const router = useRouter();
  const orderId = params?.orderId as string;
  
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [ratings, setRatings] = useState<{[key: string]: number}>({});
  const [comments, setComments] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
<<<<<<< HEAD
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!tableNumber || !currentRound) {
      router.push('/');
      return;
    }

    const fetchOrders = async () => {
      try {
        // Only fetch orders if we're past round 1
        if (currentRound === 1) {
          setOrderItems([]);
          setIsLoading(false);
          return;
        }

        const response = await fetch(`/api/orders/feedback?tableNumber=${tableNumber}&round=${currentRound}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch orders');
        }
        
        const orders = await response.json();
        
        // Create unique items array from all orders in this round
        const allItems = orders.flatMap((order: any) => order.items);
=======
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  useEffect(() => {
    const fetchOrderItems = async () => {
      if (!orderId) return;
      
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) throw new Error('Failed to fetch order');
        
        const data = await response.json();
>>>>>>> parent of a498088 (round system)
        const uniqueItems = Array.from(
          new Set(data.items.map((item: OrderItem) => item.menuItemId))
        ).map(id => 
          data.items.find((item: OrderItem) => item.menuItemId === id)
        );
        setOrderItems(uniqueItems);
      } catch (error) {
<<<<<<< HEAD
        console.error('Error fetching orders:', error);
        setError(error instanceof Error ? error.message : 'Failed to load order details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [tableNumber, currentRound, router]);
=======
        console.error('Error fetching order:', error);
        setError('Failed to load order details');
      }
    };

    fetchOrderItems();
  }, [orderId]);
>>>>>>> parent of a498088 (round system)

  const handleRatingChange = (itemId: string, rating: number) => {
    setRatings(prev => ({ ...prev, [itemId]: rating }));
  };

  const handleCommentChange = (itemId: string, comment: string) => {
    setComments(prev => ({ ...prev, [itemId]: comment }));
  };

  const fetchRecommendations = async () => {
    setLoadingRecommendations(true);
    try {
      const response = await fetch(`/api/recommendations/${orderId}`);
      if (!response.ok) throw new Error('Failed to fetch recommendations');
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const handleSubmit = async () => {
<<<<<<< HEAD
    if (orderItems.length === 0) {
      // If there are no items to rate (first round), just go to menu
      if (currentRound === 1) {
        router.push('/menu');
        return;
      }
      return;
    }
=======
    if (!orderId || orderItems.length === 0) return;
>>>>>>> parent of a498088 (round system)
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const feedbackPromises = orderItems.map(item => {
        if (!ratings[item.menuItemId]) return Promise.resolve();

        return fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            menuItemId: item.menuItemId,
            orderId,
            rating: ratings[item.menuItemId],
<<<<<<< HEAD
            comment: comments[item.menuItemId] || '',
            tableNumber,
            round: currentRound - 1 // Feedback is for the previous round
=======
            comment: comments[item.menuItemId] || ''
>>>>>>> parent of a498088 (round system)
          })
        });
      });
      
      await Promise.all(feedbackPromises.filter(Boolean));
      await fetchRecommendations();
      setShowRecommendations(true);
    } catch (err) {
      console.error('Failed to submit feedback:', err);
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-warmWhite min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your order details...</p>
        </div>
      </div>
    );
  }

  // Handle first round case
  if (currentRound === 1) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-warmWhite min-h-screen">
        <h1 className="text-3xl font-joti text-terracotta-600 text-center mb-8">
          Welcome to Round {currentRound}/5
        </h1>
        <p className="text-center text-gray-600 mb-8">
          After you enjoy your first round of tapas, you'll be able to provide feedback here.
        </p>
        <button
          onClick={() => router.push('/menu')}
          className="mt-8 w-full bg-terracotta-600 text-white py-3 rounded-full hover:bg-terracotta-700 transition-colors font-joti text-xl"
        >
          Start Ordering
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-red-500 text-center p-4 font-joti">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 w-full bg-terracotta-600 text-white py-2 rounded-full hover:bg-terracotta-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Show message if no orders found
  if (orderItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-warmWhite min-h-screen">
        <h1 className="text-3xl font-joti text-terracotta-600 text-center mb-8">
          No Orders Found
        </h1>
        <p className="text-center text-gray-600 mb-8">
          We couldn't find any orders from your previous round. Would you like to continue to the menu?
        </p>
        <button
          onClick={() => router.push('/menu')}
          className="mt-8 w-full bg-terracotta-600 text-white py-3 rounded-full hover:bg-terracotta-700 transition-colors font-joti text-xl"
        >
          Go to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-warmWhite min-h-screen">
      {!showRecommendations ? (
        <>
          <h1 className="text-3xl font-joti text-terracotta-600 text-center mb-8">
            How was your food?
          </h1>
          
          <div className="space-y-8">
            {orderItems.map((item) => (
              <div key={item.menuItemId} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-terracotta-600">
                <h2 className="text-xl font-joti text-terracotta-600 mb-4">{item.menuItem.name}</h2>
                
                <div className="mb-6">
                  <div className="text-sm font-joti text-gray-600 mb-2">Your Rating</div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRatingChange(item.menuItemId, star)}
                        className={`text-3xl transform transition-transform hover:scale-110 ${
                          (ratings[item.menuItemId] || 0) >= star 
                            ? 'text-amber-400' 
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-joti text-gray-600 mb-2">Comments (optional)</div>
                  <textarea
                    value={comments[item.menuItemId] || ''}
                    onChange={(e) => handleCommentChange(item.menuItemId, e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-terracotta-600 focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Tell us what you thought about this dish..."
                  />
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || Object.keys(ratings).length === 0}
            className="mt-8 w-full bg-terracotta-600 text-white py-3 rounded-full hover:bg-terracotta-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-joti text-xl"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
          
          {Object.keys(ratings).length === 0 && (
            <p className="text-center text-gray-500 mt-2 text-sm">
              Please rate at least one dish to submit your feedback
            </p>
          )}
        </>
      ) : (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-joti text-terracotta-600 mb-4">¡Gracias!</h2>
            <p className="text-xl font-joti text-gray-600 mb-8">
              Based on your taste, we think you&apos;ll love these:
            </p>
          </div>

          {loadingRecommendations ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta-600"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {recommendations.map(({ menuItem, reason }) => (
                  <div key={menuItem.id} className="flex flex-col">
                    <MenuCard {...menuItem} />
                    <p className="mt-2 text-sm text-gray-600 text-center font-joti italic">
                      {reason}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-12">
                <button
                  onClick={() => router.push('/menu')}
                  className="px-8 py-3 bg-terracotta-600 text-white rounded-full hover:bg-terracotta-700 transition-colors font-joti text-xl"
                >
                  Back to Menu
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}