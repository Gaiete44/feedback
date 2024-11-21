// app/_components/Cart.tsx
'use client'

import * as Dialog from '@radix-ui/react-dialog';
import { useCart } from '../_context/CardContext';

import { CartItem } from '../_types/menu';

export const Cart: React.FC = () => {
  const { items, total, removeFromCart } = useCart();

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
          <div className="space-y-4">
            {items.map((item: CartItem) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <Dialog.Close asChild>
            <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition-colors">
              Checkout
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};