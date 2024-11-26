// app/_components/CategoryTabs.tsx
'use client'

import * as Tabs from '@radix-ui/react-tabs';

export const CategoryTabs: React.FC<{
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}> = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <Tabs.Root value={activeCategory} onValueChange={onSelectCategory}>
      <Tabs.List className="flex flex-wrap justify-center gap-4 p-4 bg-warmWhite shadow-inner">
        {categories.map((category) => (
          <Tabs.Trigger
            key={category}
            value={category}
            className={`px-6 py-2 font-joti text-lg rounded-full transition-all
              ${activeCategory === category 
                ? 'bg-terracotta-600 text-white shadow-md transform scale-105' 
                : 'text-terracotta-600 hover:bg-terracotta-50'}`}
          >
            {category}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
};