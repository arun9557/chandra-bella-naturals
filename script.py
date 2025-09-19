# Let's create a comprehensive product data structure for the beauty brand website
import json

# Create product data for different categories
beauty_products = {
    "face": [
        {
            "id": 1,
            "name": "Radiant Glow Foundation",
            "price": "₹899",
            "image": "/images/foundation.jpg",
            "rating": 4.8,
            "reviews": 156,
            "description": "Natural coverage foundation with SPF 30 protection",
            "ingredients": ["Jojoba Oil", "Vitamin E", "Zinc Oxide", "Argan Oil"],
            "usage": "Apply with brush or fingers, blend evenly for natural coverage"
        },
        {
            "id": 2,
            "name": "Himalayan Clay Face Mask",
            "price": "₹549",
            "image": "/images/face-mask.jpg",
            "rating": 4.9,
            "reviews": 203,
            "description": "Deep cleansing mask with natural Himalayan clay",
            "ingredients": ["Himalayan Pink Clay", "Rose Water", "Aloe Vera", "Tea Tree Oil"],
            "usage": "Apply thin layer, leave for 15 minutes, rinse with warm water"
        },
        {
            "id": 3,
            "name": "Vitamin C Brightening Serum",
            "price": "₹1299",
            "image": "/images/vitamin-c-serum.jpg",
            "rating": 4.7,
            "reviews": 89,
            "description": "Brightening serum with 20% Vitamin C for radiant skin",
            "ingredients": ["Vitamin C", "Hyaluronic Acid", "Niacinamide", "Green Tea Extract"],
            "usage": "Apply 2-3 drops on clean face, follow with moisturizer"
        }
    ],
    "lips": [
        {
            "id": 4,
            "name": "Organic Tinted Lip Balm",
            "price": "₹299",
            "image": "/images/lip-balm.jpg",
            "rating": 4.6,
            "reviews": 124,
            "description": "Nourishing lip balm with natural tint and SPF protection",
            "ingredients": ["Shea Butter", "Coconut Oil", "Beeswax", "Natural Fruit Extracts"],
            "usage": "Apply generously to lips throughout the day"
        },
        {
            "id": 5,
            "name": "Matte Liquid Lipstick",
            "price": "₹699",
            "image": "/images/liquid-lipstick.jpg",
            "rating": 4.5,
            "reviews": 178,
            "description": "Long-lasting matte lipstick in vibrant shades",
            "ingredients": ["Natural Waxes", "Plant-based Pigments", "Vitamin E", "Jojoba Oil"],
            "usage": "Apply from center of lips outward, allow to dry"
        }
    ],
    "skincare": [
        {
            "id": 6,
            "name": "Rose & Hibiscus Toner",
            "price": "₹499",
            "image": "/images/toner.jpg",
            "rating": 4.8,
            "reviews": 267,
            "description": "Hydrating toner with rose water and hibiscus extract",
            "ingredients": ["Rose Water", "Hibiscus Extract", "Witch Hazel", "Glycerin"],
            "usage": "Apply with cotton pad or spray directly on face after cleansing"
        },
        {
            "id": 7,
            "name": "Niacinamide + Zinc Serum",
            "price": "₹799",
            "image": "/images/niacinamide-serum.jpg",
            "rating": 4.9,
            "reviews": 145,
            "description": "Pore-minimizing serum for oily and acne-prone skin",
            "ingredients": ["Niacinamide 10%", "Zinc PCA", "Hyaluronic Acid", "Chamomile Extract"],
            "usage": "Apply 2-3 drops to clean skin, morning and evening"
        }
    ],
    "hair": [
        {
            "id": 8,
            "name": "Argan Oil Hair Mask",
            "price": "₹649",
            "image": "/images/hair-mask.jpg",
            "rating": 4.7,
            "reviews": 198,
            "description": "Deep conditioning hair mask with pure Moroccan Argan oil",
            "ingredients": ["Argan Oil", "Coconut Oil", "Shea Butter", "Keratin Protein"],
            "usage": "Apply to damp hair, leave for 20 minutes, rinse thoroughly"
        },
        {
            "id": 9,
            "name": "Herbal Hair Growth Serum",
            "price": "₹999",
            "image": "/images/hair-serum.jpg",
            "rating": 4.6,
            "reviews": 87,
            "description": "Stimulating hair serum with natural herbs for growth",
            "ingredients": ["Rosemary Oil", "Peppermint Oil", "Biotin", "Saw Palmetto"],
            "usage": "Massage into scalp daily, do not rinse"
        }
    ],
    "body": [
        {
            "id": 10,
            "name": "Lavender Body Butter",
            "price": "₹449",
            "image": "/images/body-butter.jpg",
            "rating": 4.8,
            "reviews": 156,
            "description": "Rich moisturizing body butter with calming lavender",
            "ingredients": ["Shea Butter", "Cocoa Butter", "Lavender Oil", "Vitamin E"],
            "usage": "Massage onto clean, dry skin for deep hydration"
        },
        {
            "id": 11,
            "name": "Exfoliating Body Scrub",
            "price": "₹599",
            "image": "/images/body-scrub.jpg",
            "rating": 4.7,
            "reviews": 134,
            "description": "Gentle exfoliating scrub with sea salt and essential oils",
            "ingredients": ["Dead Sea Salt", "Coconut Oil", "Sugar", "Essential Oils"],
            "usage": "Massage onto wet skin in circular motions, rinse well"
        }
    ]
}

# Create featured/bestselling products
featured_products = [
    beauty_products["face"][0],  # Foundation
    beauty_products["lips"][1],  # Liquid Lipstick
    beauty_products["skincare"][0],  # Rose Toner
    beauty_products["hair"][0],  # Argan Hair Mask
]

# Create brand information
brand_info = {
    "name": "The Chandra Bella Naturals",
    "tagline": "Embrace Your Natural Beauty",
    "mission": "To provide pure, natural beauty products that enhance your inherent radiance while caring for your skin and the environment.",
    "story": "Founded with a passion for natural beauty, The Chandra Bella Naturals believes that true beauty comes from within and is enhanced by pure, natural ingredients. Our carefully curated products are crafted with love, using only the finest botanical extracts and time-tested natural remedies.",
    "values": [
        "100% Natural Ingredients",
        "Cruelty-Free & Vegan",
        "Sustainable Packaging",
        "Ethically Sourced",
        "Dermatologically Tested"
    ]
}

# Create website structure data
website_structure = {
    "brand": brand_info,
    "products": beauty_products,
    "featured": featured_products,
    "categories": ["Face", "Lips", "Skincare", "Hair", "Body"],
    "color_scheme": {
        "primary": "#8B5E83",  # Purple
        "secondary": "#E6E6FA", # Lavender
        "accent": "#9370DB",    # Medium slate blue
        "gray": "#808080",      # Gray
        "light_gray": "#F5F5F5",
        "white": "#FFFFFF"
    }
}

print("Product and brand data structure created successfully!")
print(f"Total products: {sum(len(category) for category in beauty_products.values())}")
print(f"Categories: {len(website_structure['categories'])}")
print(f"Featured products: {len(featured_products)}")