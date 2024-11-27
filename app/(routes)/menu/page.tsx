// app/(routes)/menu/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MenuCard } from '@/app/_components/MenuCard';
import { CategoryTabs } from '@/app/_components/CategoryTabs';
import { Cart } from '@/app/_components/Cart';
import { MenuItem } from '@/app/_types/menu';
import { getColorScheme } from '@/app/_lib/menuColors';
import { DietaryLegend } from '@/app/_components/DietaryLegend';
import { useTable } from '@/app/_context/TableContext';

interface MenuItemWithDietary extends MenuItem {
  dietary: {
    vegan: boolean;
    vegetarian: boolean;
    glutenFree: boolean;
    nutFree: boolean;
    dairyFree: boolean;
    spicy: boolean;
  };
}

export default function MenuPage() {
  const router = useRouter();
  const { tableNumber, numberOfPeople, currentRound, roundStartTime } = useTable();
  const [menuItems, setMenuItems] = useState<MenuItemWithDietary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    if (!tableNumber || !numberOfPeople) {
      router.push('/');
    }
  }, [tableNumber, numberOfPeople, router]);

  useEffect(() => {
    if (!roundStartTime) return;

    const startTime = new Date(roundStartTime).getTime();
    const roundDuration = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

    const updateTimer = () => {
      const now = new Date().getTime();
      const elapsed = now - startTime;
      const remaining = roundDuration - elapsed;

      if (remaining <= 0) {
        if (currentRound <= 5) {
          router.push(`/feedback/${currentRound}`);
        } else {
          router.push('/thank-you');
        }
      } else {
        setTimeRemaining(Math.floor(remaining / 1000));
      }
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(timer);
  }, [roundStartTime, currentRound, router]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const cachedData = sessionStorage.getItem('menuItems');
        const cachedTimestamp = sessionStorage.getItem('menuItemsTimestamp');
        
        if (cachedData && cachedTimestamp) {
          const isDataFresh = Date.now() - parseInt(cachedTimestamp) < 5 * 60 * 1000;
          if (isDataFresh) {
            const data = JSON.parse(cachedData);
            setMenuItems(data.map((item: any) => ({
              ...item,
              dietary: {
                vegan: item.vegan,
                vegetarian: item.vegetarian,
                glutenFree: item.glutenFree,
                nutFree: item.nutFree,
                dairyFree: item.dairyFree,
                spicy: item.spicy
              }
            })));
            if (!activeCategory && data.length > 0) {
              setActiveCategory(data[0].category);
            }
            setIsLoading(false);
            return;
          }
        }

        const response = await fetch('/api/menu');
        if (!response.ok) throw new Error('Failed to fetch menu items');
        
        const data = await response.json();
        const formattedData = data.map((item: any) => ({
          ...item,
          dietary: {
            vegan: item.vegan,
            vegetarian: item.vegetarian,
            glutenFree: item.glutenFree,
            nutFree: item.nutFree,
            dairyFree: item.dairyFree,
            spicy: item.spicy
          }
        }));
        
        setMenuItems(formattedData);
        sessionStorage.setItem('menuItems', JSON.stringify(data));
        sessionStorage.setItem('menuItemsTimestamp', Date.now().toString());
        
        if (!activeCategory && data.length > 0) {
          setActiveCategory(data[0].category);
        }
      } catch (err) {
        console.error('Error fetching menu:', err);
        setError('Failed to load menu items');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, [activeCategory]);

  const categories = [...new Set(menuItems.map(item => item.category))];
  const filteredItems = activeCategory
    ? menuItems.filter(item => item.category === activeCategory)
    : menuItems;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-warmWhite flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-joti text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className={`${activeCategory ? getColorScheme(activeCategory).primary : 'bg-terracotta-600'} text-white px-6 py-2 rounded-full hover:bg-terracotta-700 transition-colors font-joti`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-warmWhite">
        <header className={`${activeCategory ? getColorScheme(activeCategory).primary : 'bg-terracotta-600'} text-white transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-joti text-white drop-shadow-lg">La Carta</h1>
                <div className="mt-2 font-joti">
                  <p className="text-xl text-white/90">
                    Table {tableNumber} • Round {currentRound}/5
                  </p>
                  <p className="text-lg text-white/80">
                    Time Remaining: {formatTime(timeRemaining)}
                  </p>
                  <p className="text-sm text-white/70">
                    {numberOfPeople} {numberOfPeople === 1 ? 'person' : 'people'} • 3 dishes per person
                  </p>
                </div>
              </div>
              <Cart /> {/* Remove the maxDishesPerPerson prop */}
            </div>
          </div>
        
        <div className="mt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredItems.map((item) => (
                <MenuCard key={item.id} {...item} />
              ))}
            </div>
            
            <DietaryLegend />
          </>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 w-full">
        <div className={`h-1 ${activeCategory ? getColorScheme(activeCategory).accent : 'bg-terracotta-500'}`}></div>
      </footer>
    </div>
  );
}