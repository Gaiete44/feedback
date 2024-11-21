'use client'

import * as Tabs from '@radix-ui/react-tabs';

export const CategoryTabs: React.FC<{
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}> = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <Tabs.Root value={activeCategory} onValueChange={onSelectCategory}>
      <Tabs.List className="flex space-x-4 border-b border-gray-200">
        {categories.map((category) => (
          <Tabs.Trigger
            key={category}
            value={category}
            className={`px-4 py-2 text-sm font-medium transition-colors
              ${activeCategory === category 
                ? 'text-orange-500 border-b-2 border-orange-500' 
                : 'text-gray-500 hover:text-gray-700'}`}
          >
            {category.toUpperCase()}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
};