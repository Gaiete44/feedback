// app/(routes)/menu/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { MenuCard } from '@/app/_components/MenuCard';
import { CategoryTabs } from '@/app/_components/CategoryTabs';
import { Cart } from '@/app/_components/Cart';
import { MenuItem } from '@/app/_types/menu';
import { getColorScheme } from '@/app/_lib/menuColors';
import { DietaryLegend } from '@/app/_components/DietaryLegend';

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
  const [menuItems, setMenuItems] = useState<MenuItemWithDietary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('');
  
  const categories = [...new Set(menuItems.map(item => item.category))];
  const colors = activeCategory ? getColorScheme(activeCategory) : getColorScheme('SPECIALTIES');

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

  const filteredItems = activeCategory
    ? menuItems.filter(item => item.category === activeCategory)
    : menuItems;

  if (error) {
    return (
      <div className="min-h-screen bg-warmWhite flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-joti text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className={`${colors.primary} text-white px-6 py-2 rounded-full ${colors.hover} transition-colors font-joti`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warmWhite">
      <header className={`${colors.primary} text-white transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-joti text-white drop-shadow-lg">La Carta</h1>
              <p className="mt-2 font-joti text-xl text-white/90">
                {activeCategory ? activeCategory.charAt(0) + activeCategory.slice(1).toLowerCase() : 'All Dishes'}
              </p>
            </div>
            <Cart />
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
        <div className={`h-1 ${colors.accent}`}></div>
      </footer>
    </div>
  );
}