// app/_components/CategoryTabs.tsx
'use client'

import * as Tabs from '@radix-ui/react-tabs';
import { getColorScheme } from '@/app/_lib/menuColors';

export const CategoryTabs: React.FC<{
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}> = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <Tabs.Root value={activeCategory} onValueChange={onSelectCategory}>
      <Tabs.List className="flex flex-wrap justify-center gap-4 p-4">
        {categories.map((category) => {
          const colors = getColorScheme(category);
          return (
            <Tabs.Trigger
              key={category}
              value={category}
              className={`px-6 py-2 font-joti text-lg rounded-full transition-all duration-200
                ${activeCategory === category 
                  ? 'bg-white ' + colors.text + ' shadow-md transform scale-105' 
                  : 'text-white hover:bg-white/10'}`}
            >
              {category}
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>
    </Tabs.Root>
  );
};