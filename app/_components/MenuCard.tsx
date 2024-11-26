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
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-terracotta-600 text-white px-3 py-1 rounded-full text-sm font-joti">
            {category}
          </span>
        </div>
      </div>
      <div className="p-4 border-t-4 border-terracotta-600">
        <h3 className="font-joti text-xl text-terracotta-600">{name}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-jade-600 font-joti text-xl">${price.toFixed(2)}</span>
          <button
            onClick={() => addToCart({ id, name, description, price, image, category })}
            className="bg-terracotta-600 text-white px-4 py-2 rounded-full hover:bg-terracotta-700 transition-colors font-joti"
          >
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};