// app/(routes)/feedback/[orderId]/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface OrderItem {
  menuItem: {
    id: string;
    name: string;
    description: string;
  };
  quantity: number;
}

interface Order {
  items: OrderItem[];
}

export default function FeedbackPage() {
  const { orderId } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [ratings, setRatings] = useState<{[key: string]: number}>({});
  const [comments, setComments] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) throw new Error('Failed to fetch order');
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError('Failed to load order details');
        console.error(err);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleRatingChange = (itemId: string, rating: number) => {
    setRatings(prev => ({ ...prev, [itemId]: rating }));
  };

  const handleCommentChange = (itemId: string, comment: string) => {
    setComments(prev => ({ ...prev, [itemId]: comment }));
  };

  const handleSubmit = async () => {
    if (!order) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const uniqueItems = Array.from(
        new Set(order.items.map(item => item.menuItem.id))
      );

      await Promise.all(
        uniqueItems.map(menuItemId => {
          if (!ratings[menuItemId]) return Promise.resolve();

          return fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              menuItemId,
              orderId,
              rating: ratings[menuItemId],
              comment: comments[menuItemId] || ''
            })
          });
        })
      );

      router.push('/thank-you');
    } catch (err) {
      setError('Failed to submit feedback');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  if (!order) {
    return <div className="text-center p-4">Loading...</div>;
  }

  // Remove duplicate items
  const uniqueItems = Array.from(
    new Map(order.items.map(item => [item.menuItem.id, item])).values()
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Order Feedback</h1>
      
      <div className="space-y-8">
        {uniqueItems.map((item) => (
          <div key={item.menuItem.id} className="border rounded-lg p-4">
            <h2 className="text-lg font-medium mb-2">{item.menuItem.name}</h2>
            
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-2">Rating</div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingChange(item.menuItem.id, star)}
                    className={`text-2xl ${
                      (ratings[item.menuItem.id] || 0) >= star 
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
                value={comments[item.menuItem.id] || ''}
                onChange={(e) => handleCommentChange(item.menuItem.id, e.target.value)}
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