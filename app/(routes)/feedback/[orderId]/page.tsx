// app/(routes)/feedback/[orderId]/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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

interface OrderItem {
  menuItemId: string;
  menuItem: MenuItem;
  quantity: number;
}

export default function FeedbackPage() {
  const params = useParams();
  const router = useRouter();
  const { tableNumber, currentRound, incrementRound } = useTable();
  
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [ratings, setRatings] = useState<{[key: string]: number}>({});
  const [comments, setComments] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!tableNumber || !currentRound) return;
      
      try {
        const response = await fetch(`/api/orders?tableNumber=${tableNumber}&round=${currentRound}`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        
        const orders = await response.json();
        
        // Combine all items from all orders in this round
        const allItems = orders.flatMap((order: any) => order.items);
        
        // Create unique items array
        const uniqueItems = Array.from(
          new Set(allItems.map((item: OrderItem) => item.menuItemId))
        ).map(id => 
          allItems.find((item: OrderItem) => item.menuItemId === id)
        );
        
        setOrderItems(uniqueItems);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load order details');
      }
    };

    fetchOrders();
  }, [tableNumber, currentRound]);

  const handleRatingChange = (itemId: string, rating: number) => {
    setRatings(prev => ({ ...prev, [itemId]: rating }));
  };

  const handleCommentChange = (itemId: string, comment: string) => {
    setComments(prev => ({ ...prev, [itemId]: comment }));
  };

  const handleSubmit = async () => {
    if (!tableNumber || orderItems.length === 0) return;
    
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
            rating: ratings[item.menuItemId],
            comment: comments[item.menuItemId] || '',
            tableNumber,
            round: currentRound
          })
        });
      });
      
      await Promise.all(feedbackPromises.filter(Boolean));
      
      if (currentRound < 5) {
        incrementRound();
        router.push('/menu');
      } else {
        router.push('/thank-you');
      }
    } catch (err) {
      console.error('Failed to submit feedback:', err);
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-red-500 text-center p-4 font-joti">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-warmWhite min-h-screen">
      <h1 className="text-3xl font-joti text-terracotta-600 text-center mb-8">
        How was your food? - Round {currentRound}/5
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
        {isSubmitting ? 'Submitting...' : `Submit Feedback & ${currentRound < 5 ? 'Continue to Next Round' : 'Finish'}`}
      </button>
      
      {Object.keys(ratings).length === 0 && (
        <p className="text-center text-gray-500 mt-2 text-sm">
          Please rate at least one dish to submit your feedback
        </p>
      )}
    </div>
  );
}