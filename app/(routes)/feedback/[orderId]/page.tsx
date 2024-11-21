// app/(routes)/feedback/[orderId]/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface OrderItem {
  menuItemId: string;
  menuItem: {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    image: string;
  };
  quantity: number;
}

export default function FeedbackPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.orderId as string;
  
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [ratings, setRatings] = useState<{[key: string]: number}>({});
  const [comments, setComments] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderItems = async () => {
      if (!orderId) return;
      
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) throw new Error('Failed to fetch order');
        
        const data = await response.json();
        // Remove duplicates
        const uniqueItems = Array.from(
          new Set(data.items.map((item: OrderItem) => item.menuItemId))
        ).map(id => 
          data.items.find((item: OrderItem) => item.menuItemId === id)
        );
        setOrderItems(uniqueItems);
      } catch (error) {
        console.error('Error fetching order:', error);
        setError('Failed to load order details');
      }
    };

    fetchOrderItems();
  }, [orderId]);

  const handleRatingChange = (itemId: string, rating: number) => {
    setRatings(prev => ({ ...prev, [itemId]: rating }));
  };

  const handleCommentChange = (itemId: string, comment: string) => {
    setComments(prev => ({ ...prev, [itemId]: comment }));
  };

  const handleSubmit = async () => {
    if (!orderId || orderItems.length === 0) return;
    
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
            comment: comments[item.menuItemId] || ''
          })
        });
      });
      
      await Promise.all(feedbackPromises.filter(Boolean));
      router.push('/thank-you');
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
        <div className="text-red-500 text-center p-4">{error}</div>
      </div>
    );
  }

  if (!orderItems.length) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Order Feedback</h1>
      
      <div className="space-y-8">
        {orderItems.map((item) => (
          <div key={item.menuItemId} className="border rounded-lg p-4">
            <h2 className="text-lg font-medium mb-2">{item.menuItem.name}</h2>
            
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-2">Rating</div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingChange(item.menuItemId, star)}
                    className={`text-2xl ${
                      (ratings[item.menuItemId] || 0) >= star 
                        ? 'text-orange-500' 
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 mb-2">Comments (optional)</div>
              <textarea
                value={comments[item.menuItemId] || ''}
                onChange={(e) => handleCommentChange(item.menuItemId, e.target.value)}
                className="w-full p-2 border rounded-md"
                rows={3}
                placeholder="Share your thoughts about this dish..."
              />
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="mt-6 w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </div>
  );
}