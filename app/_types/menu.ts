// app/_types/menu.ts
export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
  }
  
  export interface CartItem extends MenuItem {
    quantity: number;
  }

  export interface FeedbackItem {
    id: string;
    menuItemId: string;
    rating: number;
    comment?: string;
    orderId: string;
  }