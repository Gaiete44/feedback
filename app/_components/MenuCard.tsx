// app/_components/MenuCard.tsx
'use client'

import Image from 'next/image';
import * as React from 'react';
import { useCart } from '../_context/CardContext';
import { MenuItem } from '../_types/menu';

export const MenuCard: React.FC<MenuItem> = ({ 
  id, 
  name, 
  description, 
  price, 
  image,
  category 
}) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-orange-500 font-semibold">${price.toFixed(2)}</span>
          <button
            onClick={() => addToCart({ id, name, description, price, image, category })}
            className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors"
          >
            + ORDER NOW
          </button>
        </div>
      </div>
    </div>
  );
};
