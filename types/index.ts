export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  sort_order: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  short_description?: string;
  price: number;
  compare_at_price?: number;
  original_price?: number;
  category_id?: string;
  category?: Category;
  tags: string[];
  product_type: "ebook" | "template" | "bundle";
  file_url?: string;
  file_size?: number;
  file_format?: string;
  preview_images: string[];
  featured: boolean;
  status: "draft" | "published" | "archived";
  sales_count: number;
  rating?: number;
  review_count?: number;
  image_url?: string;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  discountCode: string | null;
  discountAmount: number;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  is_admin: boolean;
}

export interface Order {
  id: string;
  order_number: string;
  status: "pending" | "paid" | "failed" | "refunded";
  subtotal: number;
  discount_amount: number;
  total: number;
  created_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
}

export interface DiscountCode {
  id: string;
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  min_order_amount?: number;
  max_uses?: number;
  used_count: number;
  valid_from?: string;
  valid_until?: string;
  active: boolean;
}

export interface DiscountValidation {
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  discount_amount: number;
}
