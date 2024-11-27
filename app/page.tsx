// app/page.tsx
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTable } from './_context/TableContext';

export default function HomePage() {
  const router = useRouter();
  const { setTableInfo } = useTable();
  const [tableNumber, setTableNumber] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tableNum = parseInt(tableNumber);
    const peopleNum = parseInt(numberOfPeople);
    
    if (isNaN(tableNum) || isNaN(peopleNum)) {
      setError('Please enter valid numbers');
      return;
    }

    if (peopleNum < 1) {
      setError('Number of people must be at least 1');
      return;
    }

    setTableInfo(tableNum, peopleNum);
    router.push('/menu');
  };

  return (
    <div className="min-h-screen bg-warmWhite flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-joti text-terracotta-600 text-center mb-8">
          Welcome to Tapas Time
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="tableNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Table Number
            </label>
            <input
              type="number"
              id="tableNumber"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-terracotta-600 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700 mb-1">
              Number of People
            </label>
            <input
              type="number"
              id="numberOfPeople"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-terracotta-600 focus:border-transparent"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          <button
            type="submit"
            className="w-full bg-terracotta-600 text-white py-3 rounded-full hover:bg-terracotta-700 transition-colors font-joti text-xl"
          >
            Start Ordering
          </button>
        </form>
      </div>
    </div>
  );
}