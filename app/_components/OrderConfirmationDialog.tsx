// app/_components/OrderConfirmationDialog.tsx
'use client'

import * as Dialog from '@radix-ui/react-dialog';
import { useCart } from '../_context/CardContext';

interface OrderConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  maxOrdersForTable: number;
  remainingOrders: number;
  tableNumber: number | null;
  round: number | null;
}

export const OrderConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  maxOrdersForTable,
  remainingOrders,
  tableNumber,
  round
}: OrderConfirmationDialogProps) => {
  const { items } = useCart();

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg w-full max-w-md">
          <Dialog.Title className="text-2xl font-joti text-terracotta-600 mb-4">
            Confirm Your Order
          </Dialog.Title>

          <div className="mb-6 space-y-4">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
              <p className="font-semibold mb-2">⚠️ Important:</p>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                <li>This is your order for Round {round}</li>
                <li>You can only place <span className="font-bold">one order per round</span></li>
                <li>Once confirmed, you cannot add more items to this round</li>
                <li>You are ordering {items.length} out of {maxOrdersForTable} possible dishes</li>
                <li>After ordering, you'll be asked to provide feedback on your previous order</li>
              </ul>
            </div>

            <div className="border-t border-b border-gray-200 py-4">
              <h3 className="font-joti text-lg mb-2">Order Summary:</h3>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm py-1">
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            {maxOrdersForTable - items.length > 0 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                <p>You are ordering {items.length} dishes, which is less than your maximum of {maxOrdersForTable}.</p>
                <p className="font-bold mt-1">You will not be able to order the remaining {maxOrdersForTable - items.length} dishes in this round.</p>
              </div>
            )}

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
              <p>After placing your order, you'll be redirected to provide feedback on your previous dishes.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-jade-600 text-white rounded-full hover:bg-jade-700 transition-colors font-joti"
            >
              Confirm Order
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};