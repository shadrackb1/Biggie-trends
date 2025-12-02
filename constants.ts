import { Product } from './types';

export const CATEGORIES = ["All", "Men", "Women", "Hoodies", "Streetwear", "Shoes"];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Oversized Graphic Hoodie",
    price: 85,
    category: "Hoodies",
    image: "https://picsum.photos/seed/hoodie1/500/600",
    description: "Heavyweight cotton fleece with puff print graphics. The ultimate streetwear staple.",
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isTrending: true
  },
  {
    id: 2,
    name: "Utility Cargo Pants",
    price: 120,
    category: "Streetwear",
    image: "https://picsum.photos/seed/cargo1/500/600",
    description: "Multi-pocket functional cargos with adjustable ankle straps. Water-resistant finish.",
    sizes: ["30", "32", "34", "36"],
    isTrending: true
  },
  {
    id: 3,
    name: "Chunky Sole Sneakers",
    price: 150,
    category: "Shoes",
    image: "https://picsum.photos/seed/sneaker1/500/600",
    description: "Retro-futuristic silhouette with maximum comfort foam technology.",
    sizes: ["7", "8", "9", "10", "11"],
    isNew: true
  },
  {
    id: 4,
    name: "Essential Boxy Tee",
    price: 45,
    category: "Men",
    image: "https://picsum.photos/seed/tee1/500/600",
    description: "Premium heavyweight cotton with a dropped shoulder fit.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    isTrending: false
  },
  {
    id: 5,
    name: "Distressed Denim Jacket",
    price: 110,
    category: "Streetwear",
    image: "https://picsum.photos/seed/jacket1/500/600",
    description: "Vintage wash denim with hand-distressed detailing and custom hardware.",
    sizes: ["M", "L", "XL"],
    isTrending: true
  },
  {
    id: 6,
    name: "Tech-Fleece Joggers",
    price: 95,
    category: "Women",
    image: "https://picsum.photos/seed/jogger1/500/600",
    description: "Slim fit tech fleece for athletic or casual styling.",
    sizes: ["XS", "S", "M", "L"],
    isNew: false
  }
];

export const MOCK_ORDERS = [
  { id: "ORD-001", customerName: "John Doe", total: 245, status: "Pending", date: "2023-10-25" },
  { id: "ORD-002", customerName: "Jane Smith", total: 120, status: "Shipped", date: "2023-10-24" },
  { id: "ORD-003", customerName: "Mike Ross", total: 85, status: "Delivered", date: "2023-10-20" },
];