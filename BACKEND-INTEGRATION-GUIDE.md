# ShopBot Backend Integration Guide

## Frontend Deployment URL
**Live Site:** https://shopbot-mymgsj8jt-victorifechukwu2004-2936s-projects.vercel.app

---

## Summary of Recent Updates (This Session)

### 1. Mobile Header Fix
- **Issue:** Site name was hidden on mobile (`hidden sm:block`)
- **Fix:** Removed responsive hiding, site name now visible on all screen sizes
- **File:** `components/shop/header.tsx`

### 2. Premium UI Upgrades
- Enhanced hero section with:
  - Animated gradient orbs with floating particles
  - Underline animation on "Reimagined" text
  - Avatar stack showing happy customers
  - Trust badges (Google, Microsoft, Amazon, Meta)
  - Featured product preview card
  - Floating stats card
- Improved glass card hover effects
- Premium button animations

### 3. Scroll-to-Top Button (Mobile Only)
- **Location:** Fixed bottom-right corner
- **Appearance:** Gradient button with arrow-up icon
- **Trigger:** Appears after scrolling 400px
- **Animation:** Smooth fade-in with pulse effect
- **File:** `components/shop/scroll-to-top.tsx`
- **Visibility:** Hidden on desktop (`lg:hidden`)

### 4. Functional Search Modal
- **Trigger:** Click search icon in header
- **Features:**
  - Real-time product filtering (mock data currently)
  - Keyboard navigation (↑↓ arrows, Enter to select, ESC to close)
  - Trending searches quick buttons
  - Product results with thumbnails
  - AI search promo banner
- **File:** `components/shop/search-modal.tsx`
- **State Management:** `useUIStore` for modal state

### 5. Products Page Reorganization
- **New Layout:** Products display first, filters in collapsible panel
- **Enhancements:**
  - Search bar integrated in main bar
  - Filter toggle with active count badge
  - Smooth expand/collapse animation
  - Active filter pills with remove button
  - Empty state with clear filters CTA
- **File:** `app/shop/products/page.tsx`

---

## Frontend Architecture Overview

### State Management (Zustand Stores)

#### 1. Cart Store (`lib/stores/cart-store.ts`)
```typescript
interface CartStore {
  items: CartItem[];
  discountCode: string | null;
  discountAmount: number;
  discountType: "percentage" | "fixed" | null;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getSubtotal: () => number;
  getTotal: () => number;
  applyDiscount: (code: string, amount: number, type: "percentage" | "fixed") => void;
}
```
- **Persistence:** localStorage (key: "shopbot-cart")
- **Backend Integration:** Sync cart with user account on login

#### 2. Auth Store (`lib/stores/auth-store.ts`)
```typescript
interface AuthStore {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}
```
- **Backend Integration:** Connect to Supabase Auth

#### 3. UI Store (`lib/stores/ui-store.ts`)
```typescript
interface UIStore {
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  toasts: Toast[];
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  addToast: (toast: Omit<Toast, "id">) => void;
}
```

---

## API Routes Ready for Backend

### 1. Products API (`app/api/products/`)
**Files:**
- `route.ts` - GET /api/products (list all)
- `[slug]/route.ts` - GET /api/products/[slug] (single product)

**Expected Backend Response:**
```typescript
interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  short_description?: string;
  price: number;
  compare_at_price?: number;
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
  created_at: string;
  updated_at?: string;
  embedding?: number[]; // For AI search (384-dim)
}
```

### 2. Categories API (`app/api/categories/route.ts`)
**Expected Backend Response:**
```typescript
interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string; // Lucide icon name
  sort_order: number;
  product_count?: number; // Computed field
}
```

### 3. Orders API (`app/api/orders/`)
**Files:**
- `route.ts` - GET (user's orders), POST (create order)

**Expected Backend Response:**
```typescript
interface Order {
  id: string;
  order_number: string; // Format: SHOP-XXXXX
  user_id: string;
  status: "pending" | "paid" | "failed" | "refunded";
  subtotal: number;
  discount_amount: number;
  total: number;
  discount_code?: string;
  stripe_payment_intent_id?: string;
  telegram_notified: boolean;
  created_at: string;
  paid_at?: string;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
}
```

### 4. Checkout API (`app/api/checkout/`)
**Files:**
- `route.ts` - POST (create payment intent)
- `success/route.ts` - POST (handle successful payment)

**Integration Requirements:**
- Stripe PaymentIntent creation
- Order creation after successful payment
- Clear cart after order completion

### 5. Webhooks (`app/api/webhooks/`)
**Files:**
- `stripe/route.ts` - Handle Stripe webhooks

**Required Stripe Events:**
- `payment_intent.succeeded`
- `payment_intent.payment_failed`

### 6. Discount API (`app/api/discount/route.ts`)
**Integration:** Validate discount codes

**Request:**
```typescript
{ code: string; subtotal: number; }
```

**Response:**
```typescript
{
  valid: boolean;
  code?: string;
  discount_type?: "percentage" | "fixed";
  discount_value?: number;
  discount_amount?: number;
  error?: string;
}
```

---

## Search Implementation Guide

### Current: Client-Side Mock Search
**File:** `components/shop/search-modal.tsx`
- Uses static mock product array
- Filters by name, description, tags

### Backend Integration Options

#### Option 1: Full-Text Search (PostgreSQL)
```sql
-- Add search vector
ALTER TABLE products ADD COLUMN search_vector tsvector;

-- Create index
CREATE INDEX idx_products_search ON products USING GIN(search_vector);

-- Update trigger
CREATE OR REPLACE FUNCTION update_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(array_to_string(NEW.tags, ' '), '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

#### Option 2: Semantic Search (AI-Powered)
**Requirements:**
- Hugging Face API key (already in .env.local)
- pgvector extension
- 384-dimensional embeddings

**Implementation:**
```sql
-- Enable pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- Add embedding column
ALTER TABLE products ADD COLUMN embedding vector(384);

-- Create similarity search function
CREATE OR REPLACE FUNCTION match_products(
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
RETURNS TABLE(...)
```

**Frontend Integration:**
- Call Hugging Face to get query embedding
- Use Supabase RPC to find similar products

---

## Environment Variables Required

```bash
# Supabase (Database + Auth)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe (Payments)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI Services
GROQ_API_KEY=gsk_... (already set)
HUGGINGFACE_API_KEY=hf_... (already set)

# Telegram (Admin Notifications)
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# App Config
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## Database Schema (Supabase)

### Tables Required

#### 1. categories
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 2. products
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  price DECIMAL(10,2) NOT NULL,
  compare_at_price DECIMAL(10,2),
  category_id UUID REFERENCES categories(id),
  tags TEXT[],
  product_type TEXT CHECK (product_type IN ('ebook', 'template', 'bundle')),
  file_url TEXT,
  file_size INTEGER,
  file_format TEXT,
  preview_images TEXT[],
  featured BOOLEAN DEFAULT FALSE,
  status TEXT CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
  sales_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3. orders
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  guest_email TEXT,
  status TEXT CHECK (status IN ('pending', 'paid', 'failed', 'refunded')) DEFAULT 'pending',
  subtotal DECIMAL(10,2) NOT NULL,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  discount_code TEXT,
  stripe_payment_intent_id TEXT,
  telegram_notified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE
);
```

#### 4. order_items
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER DEFAULT 1
);
```

#### 5. user_purchases
```sql
CREATE TABLE user_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  order_id UUID REFERENCES orders(id),
  download_count INTEGER DEFAULT 0,
  last_downloaded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
```

---

## Key Integration Points

### 1. Product Search
**Current:** Mock data in `components/shop/search-modal.tsx`
**Integration:**
- Replace `mockProducts` array with API call
- Implement debounced search (300ms)
- Add loading states

### 2. Cart Persistence
**Current:** localStorage only
**Integration:**
- On login: Merge local cart with server cart
- On add: Sync to server if authenticated
- On checkout: Validate cart items server-side

### 3. User Authentication
**Current:** Mock auth in auth store
**Integration:**
- Connect to Supabase Auth
- Implement magic link option
- Social login (Google, GitHub)

### 4. Checkout Flow
**Current:** Simulated payment
**Integration:**
- Create PaymentIntent on checkout
- Handle Stripe Elements
- Webhook for payment confirmation
- Create order record on success

### 5. Admin Dashboard
**Current:** Mock stats
**Integration:**
- Real sales analytics
- Order management
- Product CRUD
- Customer list

---

## Files Modified This Session

1. `components/shop/header.tsx` - Mobile header fix
2. `components/shop/hero-section.tsx` - Premium UI upgrade
3. `components/shop/scroll-to-top.tsx` - NEW
4. `components/shop/search-modal.tsx` - NEW
5. `app/shop/products/page.tsx` - Reorganized layout
6. `app/layout.tsx` - Added new components

---

## Testing Checklist for Backend Integration

### Products
- [ ] Product listing with pagination
- [ ] Product detail page with slug
- [ ] Category filtering
- [ ] Search with results
- [ ] Featured products on homepage

### Cart
- [ ] Add to cart (logged out)
- [ ] Add to cart (logged in)
- [ ] Cart persistence across sessions
- [ ] Cart sync on login

### Checkout
- [ ] Guest checkout flow
- [ ] Authenticated checkout
- [ ] Discount code application
- [ ] Stripe payment processing
- [ ] Order confirmation email

### User Account
- [ ] Sign up with email
- [ ] Login with email
- [ ] Social login
- [ ] Password reset
- [ ] Download library
- [ ] Order history

### Admin
- [ ] Dashboard stats
- [ ] Product management
- [ ] Order management
- [ ] Customer list

---

## Next Steps for Backend Session

1. **Set up Supabase project**
2. **Run database migrations** (SQL from spec.md)
3. **Configure RLS policies**
4. **Implement API routes** (files already created)
5. **Set up Stripe** (test mode first)
6. **Configure Telegram bot**
7. **Test end-to-end flows**

---

## Questions?

The frontend is fully functional with mock data. All API routes are stubbed and ready for backend implementation. The UI has been tested on mobile and desktop.

For the backend session, focus on:
1. Database setup (Supabase)
2. API implementation
3. Authentication flow
4. Payment integration (Stripe)
5. Admin functionality
