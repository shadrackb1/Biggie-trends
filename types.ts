export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  sizes: string[];
  isNew?: boolean;
  isTrending?: boolean;
}

export interface CartItem extends Product {
  selectedSize: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  date: string;
  items: CartItem[];
}

export type SortOption = 'popular' | 'newest' | 'priceHighLow' | 'priceLowHigh';
