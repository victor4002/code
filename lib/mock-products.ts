// Fallback mock products when database is empty
export const mockProducts = [
  {
    id: "1",
    slug: "ultimate-design-system",
    name: "Ultimate Design System",
    description: "A comprehensive design system with 500+ components, icons, and templates. Perfect for creating stunning interfaces quickly. Includes Figma files, React components, and full documentation.",
    short_description: "Complete design system with 500+ components",
    price: 49,
    compare_at_price: 99,
    category: { id: "1", slug: "templates", name: "Templates" },
    category_id: "1",
    tags: ["bestseller", "popular"],
    product_type: "template",
    image_url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80"
    ],
    featured: true,
    status: "published",
    sales_count: 1250,
    rating: 4.9,
    review_count: 128,
    file_format: "fig",
    file_size: 157286400,
    created_at: "2024-01-15T00:00:00Z"
  },
  {
    id: "2",
    slug: "saas-starter-kit",
    name: "SaaS Starter Kit",
    description: "Launch your SaaS business in days, not months. Includes authentication, billing, database setup, and a beautiful UI. Built with Next.js, TypeScript, and Tailwind CSS.",
    short_description: "Complete SaaS boilerplate with auth & billing",
    price: 79,
    compare_at_price: 149,
    category: { id: "2", slug: "templates", name: "Templates" },
    category_id: "2",
    tags: ["bestseller", "featured"],
    product_type: "template",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    ],
    featured: true,
    status: "published",
    sales_count: 890,
    rating: 4.8,
    review_count: 96,
    file_format: "zip",
    file_size: 52428800,
    created_at: "2024-01-20T00:00:00Z"
  },
  {
    id: "3",
    slug: "digital-marketing-masterclass",
    name: "Digital Marketing Masterclass",
    description: "Learn the exact strategies used by top digital marketers. Covers SEO, social media, email marketing, PPC, and analytics. 20+ hours of video content.",
    short_description: "Complete digital marketing course",
    price: 89,
    category: { id: "3", slug: "ebooks", name: "eBooks" },
    category_id: "3",
    tags: ["popular"],
    product_type: "ebook",
    image_url: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c0b0?w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c0b0?w=800&q=80"
    ],
    featured: true,
    status: "published",
    sales_count: 2100,
    rating: 4.7,
    review_count: 312,
    file_format: "pdf",
    file_size: 104857600,
    created_at: "2024-02-01T00:00:00Z"
  },
  {
    id: "4",
    slug: "ui-icon-pack-pro",
    name: "UI Icon Pack Pro",
    description: "2000+ premium vector icons for your next project. Includes SVG, PNG, and React components. Fully customizable and optimized for web and mobile.",
    short_description: "2000+ premium vector icons",
    price: 29,
    compare_at_price: 59,
    category: { id: "4", slug: "templates", name: "Templates" },
    category_id: "4",
    tags: ["bestseller"],
    product_type: "template",
    image_url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80"
    ],
    featured: false,
    status: "published",
    sales_count: 3400,
    rating: 4.9,
    review_count: 456,
    file_format: "zip",
    file_size: 26214400,
    created_at: "2024-02-10T00:00:00Z"
  },
  {
    id: "5",
    slug: "entrepreneur-blueprint",
    name: "The Entrepreneur's Blueprint",
    description: "A comprehensive guide to building and scaling your business. From idea validation to product-market fit, funding, and growth strategies.",
    short_description: "Complete entrepreneurship guide",
    price: 39,
    category: { id: "5", slug: "ebooks", name: "eBooks" },
    category_id: "5",
    tags: [],
    product_type: "ebook",
    image_url: "https://images.unsplash.com/photo-1554774853-71015e28c1ea?w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1554774853-71015e28c1ea?w=800&q=80"
    ],
    featured: false,
    status: "published",
    sales_count: 650,
    rating: 4.6,
    review_count: 78,
    file_format: "pdf",
    file_size: 52428800,
    created_at: "2024-02-15T00:00:00Z"
  },
  {
    id: "6",
    slug: "creator-bundle-2024",
    name: "Creator Bundle 2024",
    description: "The ultimate bundle for content creators. Includes video templates, sound effects, LUTs, and motion graphics. Save 60% compared to buying separately.",
    short_description: "All-in-one creator toolkit",
    price: 129,
    compare_at_price: 299,
    category: { id: "6", slug: "bundles", name: "Bundles" },
    category_id: "6",
    tags: ["bestseller", "featured"],
    product_type: "bundle",
    image_url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80"
    ],
    featured: true,
    status: "published",
    sales_count: 420,
    rating: 4.8,
    review_count: 56,
    file_format: "zip",
    file_size: 524288000,
    created_at: "2024-03-01T00:00:00Z"
  },
  {
    id: "7",
    slug: "finance-tracking-template",
    name: "Finance Tracking Template",
    description: "Track your personal or business finances with this comprehensive Notion template. Includes expense tracking, budget planning, and financial goals.",
    short_description: "Complete finance tracker",
    price: 19,
    category: { id: "7", slug: "templates", name: "Templates" },
    category_id: "7",
    tags: ["popular"],
    product_type: "template",
    image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80"
    ],
    featured: false,
    status: "published",
    sales_count: 1800,
    rating: 4.7,
    review_count: 234,
    file_format: "pdf",
    file_size: 10485760,
    created_at: "2024-03-10T00:00:00Z"
  },
  {
    id: "8",
    slug: "web-developer-roadmap",
    name: "Web Developer Roadmap 2024",
    description: "The complete roadmap to becoming a full-stack web developer. Includes learning paths, resources, project ideas, and career advice.",
    short_description: "Your path to becoming a developer",
    price: 25,
    compare_at_price: 49,
    category: { id: "8", slug: "ebooks", name: "eBooks" },
    category_id: "8",
    tags: [],
    product_type: "ebook",
    image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
    ],
    featured: false,
    status: "published",
    sales_count: 3200,
    rating: 4.8,
    review_count: 412,
    file_format: "pdf",
    file_size: 31457280,
    created_at: "2024-03-15T00:00:00Z"
  }
];

export const mockCategories = [
  { id: "1", slug: "templates", name: "Templates", description: "Ready-to-use templates", sort_order: 1 },
  { id: "2", slug: "ebooks", name: "eBooks", description: "Digital books and guides", sort_order: 2 },
  { id: "3", slug: "bundles", name: "Bundles", description: "Curated product collections", sort_order: 3 }
];

// Helper to get a single product by slug
export function getMockProductBySlug(slug: string) {
  return mockProducts.find(p => p.slug === slug) || null;
}

// Helper to filter products
export function filterMockProducts(options: {
  category?: string;
  featured?: boolean;
  search?: string;
  limit?: number;
}) {
  let results = [...mockProducts];
  
  if (options.category && options.category !== 'All') {
    results = results.filter(p => p.category?.name === options.category);
  }
  
  if (options.featured) {
    results = results.filter(p => p.featured);
  }
  
  if (options.search) {
    const searchLower = options.search.toLowerCase();
    results = results.filter(p => 
      p.name.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower)
    );
  }
  
  if (options.limit) {
    results = results.slice(0, options.limit);
  }
  
  return results;
}
