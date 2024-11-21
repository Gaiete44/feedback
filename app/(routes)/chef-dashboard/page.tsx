// app/(routes)/chef-dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react';
import * as Tabs from '@radix-ui/react-tabs';

interface FeedbackComment {
  rating: number;
  comment: string;
  date: string;
}

interface AggregatedFeedback {
  itemName: string;
  averageRating: number;
  totalRatings: number;
  comments: FeedbackComment[];
}

export default function ChefDashboard() {
  const [feedbackData, setFeedbackData] = useState<AggregatedFeedback[]>([]);
  const [timeFilter, setTimeFilter] = useState<'day' | 'week' | 'month' | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch('/api/feedback/summary');
        const data = await response.json();
        setFeedbackData(data);
      } catch (error) {
        console.error('Failed to fetch feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [timeFilter]);

  const getStarDisplay = (rating: number) => {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Chef&apos;s Dashboard</h1>
        <Tabs.Root 
  value={timeFilter} 
  onValueChange={(value: string) => {
    setTimeFilter(value as 'day' | 'week' | 'month' | 'all');
  }}
>
          <Tabs.List className="flex gap-2">
            <Tabs.Trigger
              value="day"
              className={`px-4 py-2 rounded-full ${
                timeFilter === 'day' ? 'bg-orange-500 text-white' : 'bg-gray-100'
              }`}
            >
              Today
            </Tabs.Trigger>
            <Tabs.Trigger
              value="week"
              className={`px-4 py-2 rounded-full ${
                timeFilter === 'week' ? 'bg-orange-500 text-white' : 'bg-gray-100'
              }`}
            >
              This Week
            </Tabs.Trigger>
            <Tabs.Trigger
              value="month"
              className={`px-4 py-2 rounded-full ${
                timeFilter === 'month' ? 'bg-orange-500 text-white' : 'bg-gray-100'
              }`}
            >
              This Month
            </Tabs.Trigger>
            <Tabs.Trigger
              value="all"
              className={`px-4 py-2 rounded-full ${
                timeFilter === 'all' ? 'bg-orange-500 text-white' : 'bg-gray-100'
              }`}
            >
              All Time
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbackData.map((item) => (
          <div key={item.itemName} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{item.itemName}</h2>
              <div className="text-sm text-gray-500">
                {item.totalRatings} reviews
              </div>
            </div>

            <div className="mb-6">
              <div className="text-2xl text-orange-500 font-bold">
                {getStarDisplay(item.averageRating)}
              </div>
              <div className="text-sm text-gray-500">
                Average rating: {item.averageRating.toFixed(1)}/5
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Recent Comments</h3>
              {item.comments.map((comment, index) => (
                <div key={index} className="border-t pt-3">
                  <div className="text-orange-500">
                    {getStarDisplay(comment.rating)}
                  </div>
                  <p className="text-sm mt-1">{comment.comment}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(comment.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}