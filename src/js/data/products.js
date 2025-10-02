// Product Data
export const productData = {
    // Brand Information
    brand: {
        name: "Chandra Bella Naturals",
        tagline: "Embrace Your Natural Beauty",
        mission: "To provide pure, natural beauty products that enhance your inherent radiance while caring for your skin and the environment.",
        story: "Founded with a passion for natural beauty, Chandra Bella Naturals believes that true beauty comes from within and is enhanced by pure, natural ingredients. Our carefully curated products are crafted with love, using only the finest botanical extracts and time-tested natural remedies.",
        values: [
            "100% Natural Ingredients",
            "Cruelty-Free & Vegan",
            "Sustainable Packaging",
            "Ethically Sourced",
            "Dermatologically Tested"
        ]
    },
    
    // Products by Category
    products: {
        // Face Products
        face: [
            {
                id: 1,
                name: "Radiant Glow Foundation",
                price: "₹1,299",
                image: "/images/products/foundation.jpg",
                rating: 4.7,
                reviews: 342,
                description: "Lightweight, buildable coverage with a natural finish",
                ingredients: ["Aloe Vera", "Jojoba Oil", "Turmeric", "Sandalwood"],
                usage: "Apply with fingers or brush for desired coverage",
                category: "face",
                tags: ["foundation", "makeup", "face"]
            },
            {
                id: 2,
                name: "Blush & Glow Cheek Tint",
                price: "₹599",
                image: "/images/products/cheek-tint.jpg",
                rating: 4.5,
                reviews: 278,
                description: "Creamy, blendable cheek tint for a natural flush",
                ingredients: ["Beetroot Extract", "Shea Butter", "Almond Oil"],
                usage: "Dab on cheeks and blend with fingertips",
                category: "face",
                tags: ["blush", "cheek tint", "makeup"]
            },
            {
                id: 3,
                name: "Mineral Loose Powder",
                price: "₹899",
                image: "/images/products/loose-powder.jpg",
                rating: 4.6,
                reviews: 198,
                description: "Oil-absorbing, shine-controlling loose powder",
                ingredients: ["Rice Powder", "Kaolin Clay", "Chamomile"],
                usage: "Dust lightly over foundation or wear alone",
                category: "face",
                tags: ["powder", "makeup", "oil control"]
            }
        ],
        
        // Lips Products
        lips: [
            {
                id: 4,
                name: "Nourishing Lip Balm",
                price: "₹349",
                image: "/images/products/lip-balm.jpg",
                rating: 4.8,
                reviews: 412,
                description: "Ultra-moisturizing lip balm with natural butters",
                ingredients: ["Cocoa Butter", "Beeswax", "Vitamin E", "Peppermint Oil"],
                usage: "Apply to lips as needed throughout the day",
                category: "lips",
                tags: ["lip balm", "lip care", "moisturizing"]
            },
            {
                id: 5,
                name: "Matte Liquid Lipstick",
                price: "₹699",
                image: "/images/products/lipstick.jpg",
                rating: 4.6,
                reviews: 389,
                description: "Long-wearing, transfer-proof liquid lipstick",
                ingredients: ["Shea Butter", "Jojoba Oil", "Fruit Pigments"],
                usage: "Apply to clean, dry lips",
                category: "lips",
                tags: ["lipstick", "matte", "long-lasting"]
            },
            {
                id: 6,
                name: "Lip & Cheek Tint",
                price: "₹499",
                image: "/images/products/lip-cheek-tint.jpg",
                rating: 4.7,
                reviews: 267,
                description: "Multi-purpose tint for lips and cheeks",
                ingredients: ["Pomegranate Extract", "Rose Water", "Aloe Vera"],
                usage: "Dab on lips and cheeks, blend with fingertips",
                category: "lips",
                tags: ["tint", "lip and cheek", "multi-use"]
            }
        ],
        
        // Skincare Products
        skincare: [
            {
                id: 7,
                name: "Detoxifying Face Mask",
                price: "₹549",
                image: "/images/products/face-mask.jpg",
                rating: 4.9,
                reviews: 523,
                description: "Deep cleansing mask for all skin types",
                ingredients: ["Activated Charcoal", "Bentonite Clay", "Tea Tree Oil"],
                usage: "Apply to clean face, leave for 10-15 minutes, rinse",
                category: "skincare",
                tags: ["face mask", "detox", "cleansing"]
            },
            {
                id: 8,
                name: "Hydrating Face Toner",
                price: "₹499",
                image: "/images/products/toner.jpg",
                rating: 4.8,
                reviews: 267,
                description: "Hydrating toner with rose water and hibiscus extract",
                ingredients: ["Rose Water", "Hibiscus Extract", "Witch Hazel", "Glycerin"],
                usage: "Apply with cotton pad or spray directly on face after cleansing",
                category: "skincare",
                tags: ["toner", "hydrating", "rose water"]
            },
            {
                id: 9,
                name: "Niacinamide + Zinc Serum",
                price: "₹799",
                image: "/images/products/niacinamide-serum.jpg",
                rating: 4.9,
                reviews: 421,
                description: "Pore-minimizing serum for oily and acne-prone skin",
                ingredients: ["Niacinamide 10%", "Zinc PCA", "Hyaluronic Acid", "Chamomile Extract"],
                usage: "Apply 2-3 drops to clean skin, morning and evening",
                category: "skincare",
                tags: ["serum", "niacinamide", "acne"]
            },
            {
                id: 10,
                name: "Vitamin C Brightening Cream",
                price: "₹899",
                image: "/images/products/vitamin-c-cream.jpg",
                rating: 4.7,
                reviews: 312,
                description: "Brightening cream with Vitamin C for radiant skin",
                ingredients: ["Vitamin C", "Hyaluronic Acid", "Niacinamide", "Jojoba Oil"],
                usage: "Apply to face and neck after cleansing and toning",
                category: "skincare",
                tags: ["moisturizer", "brightening", "vitamin c"]
            },
            {
                id: 11,
                name: "Overnight Repair Serum",
                price: "₹999",
                image: "/images/products/overnight-serum.jpg",
                rating: 4.8,
                reviews: 287,
                description: "Intensive overnight treatment for skin renewal",
                ingredients: ["Retinol", "Niacinamide", "Ceramides", "Squalane"],
                usage: "Apply 2-3 drops in the evening before moisturizer",
                category: "skincare",
                tags: ["serum", "anti-aging", "overnight"]
            },
            {
                id: 12,
                name: "Sunscreen SPF 50 PA+++",
                price: "₹749",
                image: "/images/products/sunscreen.jpg",
                rating: 4.9,
                reviews: 512,
                description: "Broad spectrum mineral sunscreen for daily protection",
                ingredients: ["Zinc Oxide", "Aloe Vera", "Green Tea Extract", "Vitamin E"],
                usage: "Apply liberally 15 minutes before sun exposure",
                category: "skincare",
                tags: ["sunscreen", "spf", "sun protection"]
            }
        ],
        
        // Hair Products
        hair: [
            {
                id: 13,
                name: "Argan Oil Hair Serum",
                price: "₹899",
                image: "/images/products/hair-serum.jpg",
                rating: 4.8,
                reviews: 234,
                description: "Nourishing hair serum for silky, smooth, and healthy hair",
                ingredients: ["Argan Oil", "Vitamin E", "Jojoba Oil", "Rosemary Extract"],
                usage: "Apply 2-3 drops to damp or dry hair, focusing on mid-lengths and ends",
                category: "hair",
                tags: ["hair serum", "argan oil", "hair care"]
            },
            {
                id: 14,
                name: "Natural Shampoo Bar",
                price: "₹449",
                image: "/images/products/shampoo-bar.jpg",
                rating: 4.6,
                reviews: 189,
                description: "Eco-friendly solid shampoo bar for all hair types",
                ingredients: ["Coconut Oil", "Olive Oil", "Shea Butter", "Essential Oils"],
                usage: "Wet hair and bar, lather in hands or directly on hair, rinse thoroughly",
                category: "hair",
                tags: ["shampoo bar", "eco-friendly", "natural"]
            },
            {
                id: 15,
                name: "Hair Growth Oil",
                price: "₹699",
                image: "/images/products/hair-oil.jpg",
                rating: 4.7,
                reviews: 156,
                description: "Ayurvedic hair oil blend to promote healthy hair growth",
                ingredients: ["Bhringraj", "Amla", "Fenugreek", "Curry Leaves"],
                usage: "Massage into scalp and hair, leave for 2-4 hours or overnight, wash with shampoo",
                category: "hair",
                tags: ["hair growth", "ayurvedic", "hair oil"]
            }
        ],
        
        // Body Products
        body: [
            {
                id: 16,
                name: "Body Butter - Vanilla Coconut",
                price: "₹649",
                image: "/images/products/body-butter.jpg",
                rating: 4.9,
                reviews: 298,
                description: "Rich, creamy body butter for intense hydration",
                ingredients: ["Shea Butter", "Coconut Oil", "Vanilla Extract", "Vitamin E"],
                usage: "Apply to clean, dry skin and massage until absorbed",
                category: "body",
                tags: ["body butter", "moisturizer", "vanilla"]
            },
            {
                id: 17,
                name: "Exfoliating Body Scrub",
                price: "₹549",
                image: "/images/products/body-scrub.jpg",
                rating: 4.7,
                reviews: 167,
                description: "Gentle exfoliating scrub with natural sugar and oils",
                ingredients: ["Brown Sugar", "Coconut Oil", "Coffee Grounds", "Sweet Almond Oil"],
                usage: "Apply to wet skin in circular motions, rinse with warm water",
                category: "body",
                tags: ["body scrub", "exfoliating", "coffee"]
            },
            {
                id: 18,
                name: "Natural Deodorant",
                price: "₹399",
                image: "/images/products/deodorant.jpg",
                rating: 4.5,
                reviews: 203,
                description: "Aluminum-free natural deodorant with long-lasting protection",
                ingredients: ["Coconut Oil", "Baking Soda", "Arrowroot Powder", "Essential Oils"],
                usage: "Apply a small amount to clean, dry underarms",
                category: "body",
                tags: ["deodorant", "aluminum-free", "natural"]
            },
            {
                id: 19,
                name: "Luxury Bath Salts",
                price: "₹799",
                image: "/images/products/bath-salts.jpg",
                rating: 4.8,
                reviews: 145,
                description: "Relaxing bath salts infused with lavender and eucalyptus",
                ingredients: ["Epsom Salt", "Dead Sea Salt", "Lavender Oil", "Eucalyptus Oil"],
                usage: "Add 2-3 tablespoons to warm bath water, soak and relax",
                category: "body",
                tags: ["bath salts", "relaxing", "lavender"]
            }
        ]
    },
    
    // Featured Products (IDs of featured products)
    featured: [1, 4, 7, 10, 12, 13, 16]
};

// Export a function to get all products
export function getAllProducts() {
    return Object.values(productData.products).flat();
}

// Export a function to get products by category
export function getProductsByCategory(category) {
    return productData.products[category] || [];
}

// Export a function to get a single product by ID
export function getProductById(id) {
    for (const category in productData.products) {
        const product = productData.products[category].find(p => p.id === id);
        if (product) return product;
    }
    return null;
}

// Export a function to get featured products
export function getFeaturedProducts() {
    return productData.featured.map(id => getProductById(id)).filter(Boolean);
}
