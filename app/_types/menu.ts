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