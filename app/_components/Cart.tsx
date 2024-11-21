// app/_components/Cart.tsx
'use client'

import * as Dialog from '@radix-ui/react-dialog';
import { useCart } from '../_context/CardContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const Cart: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            menuItemId: item.id,
            quantity: item.quantity
          })),
          total
        }),
      });
      
      const order = await response.json();
      clearCart();
      router.push(`/feedback/${order.id}`);
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="relative">
          <span className="sr-only">Shopping cart</span>
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {items.length}
          </span>
          ${total.toFixed(2)}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg w-full max-w-md">
          <Dialog.Title className="text-lg font-semibold mb-4">Your Cart</Dialog.Title>
          {items.length > 0 ? (
            <>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="mt-4 w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Checkout'}
              </button>
            </>
          ) : (
            <p>Your cart is empty</p>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};