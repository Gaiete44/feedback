// app/(routes)/menu/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { prisma } from '@/app/_lib/db';
import { MenuCard } from '@/app/_components/MenuCard';
import { CategoryTabs } from '@/app/_components/CategoryTabs';
import { Cart } from '@/app/_components/Cart';
import { MenuItem } from '@/app/_types/menu';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('');
  const categories = [...new Set(menuItems.map(item => item.category))];

  useEffect(() => {
    const fetchMenuItems = async () => {
      const response = await fetch('/api/menu');
      const data = await response.json();
      setMenuItems(data);
      if (data.length > 0) {
        setActiveCategory(data[0].category);
      }
    };
    fetchMenuItems();
  }, []);

  const filteredItems = activeCategory
    ? menuItems.filter(item => item.category === activeCategory)
    : menuItems;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Menu</h1>
            <Cart />
          </div>
          <div className="mt-4">
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} {...item} />
          ))}
        </div>
      </main>
    </div>
  );
}