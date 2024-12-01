// app/_components/Cart.tsx
'use client'

import * as Dialog from '@radix-ui/react-dialog';
import { useCart } from '../_context/CardContext';
import { useTable } from '../_context/TableContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { OrderConfirmationDialog } from './OrderConfirmationDialog';

export const Cart = () => {
  const { items, total, removeFromCart, clearCart } = useCart();
  const { tableNumber, numberOfPeople, currentRound } = useTable();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ordersInRound, setOrdersInRound] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const maxOrdersForTable = (numberOfPeople || 0) * 3;
  const remainingOrders = maxOrdersForTable - ordersInRound;
  const canOrder = items.length <= remainingOrders;

  const fetchOrderCount = async () => {
    if (!tableNumber || !currentRound) return;

    try {
      const response = await fetch(`/api/orders/count?tableNumber=${tableNumber}&round=${currentRound}`);
      if (!response.ok) throw new Error('Failed to fetch order count');
      const data = await response.json();
      setOrdersInRound(data.count);
    } catch (error) {
      console.error('Error fetching order count:', error);
      setOrdersInRound(0);
    }
  };

  useEffect(() => {
    fetchOrderCount();
  }, [tableNumber, currentRound]);

  const processOrder = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const orderData = {
        items: items.map(item => ({
          menuItemId: item.id,
          quantity: 1
        })),
        total: total,
        tableNumber: tableNumber,
        round: currentRound
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to place order');
      }

      const data = await response.json();
      clearCart();
      setTimeout(fetchOrderCount, 500);
      
      // Redirect to feedback page for this round
      router.push(`/feedback/${currentRound}`);
    } catch (error: any) {
      console.error('Order failed:', error);
      setError(error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
      setShowConfirmation(false);
    }
  };

  const handleOrder = () => {
    if (!tableNumber || !currentRound) {
      setError('Invalid table or round information');
      return;
    }

    if (!canOrder) {
      setError(`Maximum orders reached for this round (${maxOrdersForTable} dishes total)`);
      return;
    }

    setShowConfirmation(true);
  };

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="relative bg-jade-600 text-white px-4 py-2 rounded-full hover:bg-jade-700 transition-colors">
            <span className="font-joti">Cart</span>
            <span className="absolute -top-2 -right-2 bg-terracotta-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {items.length}
            </span>
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-warmWhite p-6 rounded-lg w-full max-w-md max-h-[85vh] overflow-y-auto">
            <Dialog.Title className="text-2xl font-joti text-terracotta-600 mb-4">Your Cart</Dialog.Title>
            
            {items.length > 0 ? (
              <>
                <div className="mb-4 p-3 bg-blue-50 text-blue-600 rounded-md text-sm">
                  <p>Orders this round: {ordersInRound} / {maxOrdersForTable}</p>
                  <p>You can add {Math.max(0, remainingOrders)} more dishes</p>
                </div>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                      <div className="relative h-16 w-16 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <h4 className="font-joti text-lg text-terracotta-600">{item.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">${item.price.toFixed(2)}</span>
                            <span className="mx-2">×</span>
                            <span>{item.quantity}</span>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full hover:bg-red-200 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-joti text-xl text-gray-800">Total:</span>
                    <span className="font-joti text-xl text-terracotta-600">${total.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={handleOrder}
                    disabled={isLoading || !canOrder || remainingOrders < 0}
                    className="w-full bg-jade-600 text-white py-3 rounded-full hover:bg-jade-700 transition-colors disabled:opacity-50 font-joti text-lg"
                  >
                    {isLoading ? 'Processing...' : 'Place Order'}
                  </button>

                  {remainingOrders < 0 && (
                    <p className="text-sm text-red-500 text-center mt-2">
                      Order limit reached for this round
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 font-joti text-lg">Your cart is empty</p>
                <p className="text-sm text-gray-500 mt-2">Add some delicious tapas to get started!</p>
              </div>
            )}

            <Dialog.Close asChild>
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <OrderConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={processOrder}
        maxOrdersForTable={maxOrdersForTable}
        remainingOrders={remainingOrders}
        tableNumber={tableNumber}
        round={currentRound}
      />
    </>
  );
};