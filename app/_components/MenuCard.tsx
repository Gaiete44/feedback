// app/_components/MenuCard.tsx
'use client'

import Image from 'next/image';
import { useCart } from '../_context/CardContext';
import { MenuItem } from '../_types/menu';
import { getColorScheme } from '@/app/_lib/menuColors';
import { dietaryIcons } from '@/app/_lib/dietaryIcons';

export const MenuCard: React.FC<MenuItem> = ({ 
  id, 
  name, 
  description, 
  price, 
  image,
  category,
  vegan,
  vegetarian,
  glutenFree,
  nutFree,
  dairyFree,
  spicy
}) => {
  const { addToCart } = useCart();
  const colors = getColorScheme(category);
  const defaultImage = '/images/chorizo.jpg';

  const dietaryProperties = {
    vegan,
    vegetarian,
    glutenFree,
    nutFree,
    dairyFree,
    spicy
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-102 h-full flex flex-col">
      <div className="relative h-48 w-full bg-gray-100 flex-shrink-0">
        <Image
          src={defaultImage}
          alt={name}
          fill
          className="object-cover"
          priority={true}
        />
        <div className="absolute top-2 right-2">
          <span className={`${colors.primary} text-white px-3 py-1 rounded-full text-sm font-joti shadow-sm`}>
            {category}
          </span>
        </div>
      </div>
      <div className={`p-4 ${colors.light} flex flex-col flex-grow`}>
        <div className="flex-grow">
          <h3 className={`font-joti text-xl ${colors.text} truncate mb-1`}>{name}</h3>
          <p className="text-gray-600 text-sm min-h-[40px]">{description}</p>
          
          {/* Dietary Icons */}
          <div className="flex flex-wrap gap-2 mt-3 mb-2">
            {Object.entries(dietaryProperties).map(([key, value]) => {
              if (value) {
                const iconConfig = dietaryIcons[key as keyof typeof dietaryIcons];
                return (
                  <div 
                    key={key}
                    className="group relative"
                  >
                    <span 
                      className={`text-lg cursor-help transition-transform duration-200 hover:scale-110 inline-block ${iconConfig.color}`}
                    >
                      {iconConfig.icon}
                    </span>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {iconConfig.label}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div className="border-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center pt-2 border-t border-gray-100">
          <span className={`text-xl font-joti ${colors.text}`}>
            ${price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart({
              id,
              name,
              description,
              price,
              image: defaultImage,
              category,
              vegan,
              vegetarian,
              glutenFree,
              nutFree,
              dairyFree,
              spicy
            })}
            className={`${colors.primary} text-white px-4 py-2 rounded-full ${colors.hover} transition-colors font-joti`}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};