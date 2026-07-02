export const PRODUCTS = [
  {
    id: 1,
    name: "Alphonso Mango",
    price: 180,
    unit: "kg",
    cat: "Fruits",
    emoji: "🥭",
    color: "#fbbf24",
    img: "/img/mango.png",
    desc: "Premium Ratnagiri Alphonso mangoes – sweet, creamy, and farm-fresh. Harvested at peak ripeness.",
    farm: "Green Valley Farm, Ratnagiri",
    weight: "1 kg / 2 kg / 5 kg",
    organic: true,
    stock: 85,
    rating: 4.8,
    reviews: [
      { name: "Priya Rajan", avatar: "P", color: "#fb923c", rating: 5, text: "Absolutely fresh and sweet! Better than any supermarket mango. Will order every season." },
      { name: "Karthik S", avatar: "K", color: "#a855f7", rating: 5, text: "Farm fresh Alphonso. The fragrance alone is incredible. Highly recommended!" }
    ]
  },
  {
    id: 2,
    name: "Sapota (Chikoo)",
    price: 60,
    unit: "kg",
    cat: "Fruits",
    emoji: "🟫",
    color: "#a16207",
    img: "/img/sapota.png",
    desc: "Fresh sapota with natural sweetness. Rich in iron and calcium. Directly from farm trees.",
    farm: "Sunrise Orchards, Tamil Nadu",
    weight: "500g / 1 kg",
    organic: true,
    stock: 120,
    rating: 4.6,
    reviews: [
      { name: "Meenakshi D", avatar: "M", color: "#38bdf8", rating: 4, text: "Very fresh and naturally sweet. Loved the quality!" }
    ]
  },
  {
    id: 3,
    name: "Fresh Lemon",
    price: 40,
    unit: "kg",
    cat: "Fruits",
    emoji: "🍋",
    color: "#fde047",
    img: "/img/lemon.png",
    desc: "Juicy, tangy lemons perfect for juice, cooking, and health drinks. Vitamin C powerhouse.",
    farm: "Citrus Valley, Erode",
    weight: "250g / 500g / 1 kg",
    organic: true,
    stock: 300,
    rating: 4.5,
    reviews: [
      { name: "Ramesh K", avatar: "R", color: "#4ade80", rating: 5, text: "Super juicy lemons! Great for nimbu paani and cooking. Very fresh delivery." }
    ]
  },
  {
    id: 4,
    name: "Tender Coconut",
    price: 35,
    unit: "piece",
    cat: "Coconut",
    emoji: "🥥",
    color: "#a3e635",
    img: "/img/coconut.png",
    desc: "Fresh tender coconut water – nature's energy drink. Harvested fresh from coastal farms.",
    farm: "Coastal Groves, Coimbatore",
    weight: "Per piece",
    organic: true,
    stock: 200,
    rating: 4.9,
    reviews: [
      { name: "Arun V", avatar: "A", color: "#16a34a", rating: 5, text: "Best tender coconuts I've had. Sweet water and fresh cream. Amazing service!" },
      { name: "Divya M", avatar: "D", color: "#ec4899", rating: 5, text: "Delivered perfectly intact, sweet and refreshing!" }
    ]
  },
  {
    id: 5,
    name: "Seasonal Fruit Basket",
    price: 350,
    unit: "basket",
    cat: "Fruits",
    emoji: "🍇",
    color: "#a855f7",
    img: "/img/basket.png",
    desc: "A curated basket of seasonal fruits: guava, papaya, banana, and more. Fresh mix every day.",
    farm: "Multiple Local Farms",
    weight: "2 kg basket",
    organic: false,
    stock: 30,
    rating: 4.7,
    reviews: [
      { name: "Lakshmi P", avatar: "L", color: "#fb923c", rating: 5, text: "Great variety! All fruits were fresh and tasted wonderful." }
    ]
  },
  {
    id: 6,
    name: "Brinjal (Eggplant)",
    price: 30,
    unit: "kg",
    cat: "Vegetables",
    emoji: "🍆",
    color: "#7c3aed",
    img: "/img/brinjal.png",
    desc: "Fresh purple brinjal, harvested daily from organic farms. Great for sambar and curries.",
    farm: "Organic Village Farms",
    weight: "500g / 1 kg",
    organic: true,
    stock: 150,
    rating: 4.4,
    reviews: [
      { name: "Suresh B", avatar: "S", color: "#38bdf8", rating: 4, text: "Very fresh and tender brinjals. Perfect for sambar!" }
    ]
  },
 
  {
    id: 8,
    name: "Green Chilli",
    price: 20,
    unit: "250g",
    cat: "Vegetables",
    emoji: "🌶️",
    color: "#16a34a",
    img: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&q=80",
    desc: "Crispy, spicy green chillis for authentic South Indian flavor in every dish.",
    farm: "Spice Hill Farms",
    weight: "100g / 250g",
    organic: false,
    stock: 500,
    rating: 4.3,
    reviews: [
      { name: "Murugan S", avatar: "M", color: "#fbbf24", rating: 4, text: "Good quality and very spicy! Perfect for our cooking." }
    ]
  },
  {
    id: 9,
    name: "Organic Spinach Seeds",
    price: 55,
    unit: "pack",
    cat: "Seeds",
    emoji: "🌱",
    color: "#4ade80",
    img: "/img/seeds.jpg",
    desc: "High-germination spinach seeds. Perfect for home garden or large farm planting.",
    farm: "Seed Bank, Coimbatore",
    weight: "50g / 100g pack",
    organic: true,
    stock: 200,
    rating: 4.5,
    reviews: [
      { name: "Geetha V", avatar: "G", color: "#16a34a", rating: 5, text: "98% germination rate! My garden is lush green thanks to these seeds." }
    ]
  },
  {
    id: 10,
    name: "Tomato Seeds (Hybrid)",
    price: 75,
    unit: "pack",
    cat: "Seeds",
    emoji: "🌿",
    color: "#f87171",
    img: "/img/tseeds.jpg",
    desc: "Premium hybrid tomato seeds with 95% germination rate. High yield, disease resistant.",
    farm: "AgriSeed Labs",
    weight: "10g pack",
    organic: false,
    stock: 150,
    rating: 4.4,
    reviews: [
      { name: "Balamurugan K", avatar: "B", color: "#ef4444", rating: 4, text: "High germination, strong plants. Great yield this season!" }
    ]
  },
 
  {
    id: 12,
    name: "Guava",
    price: 50,
    unit: "kg",
    cat: "Fruits",
    emoji: "🍐",
    color: "#86efac",
    img: "/img/guava.jpg",
    desc: "Sweet, crunchy guavas loaded with Vitamin C. Fresh picked from farm orchards.",
    farm: "Valley Orchards, Salem",
    weight: "500g / 1 kg",
    organic: true,
    stock: 180,
    rating: 4.5,
    reviews: [
      { name: "Selvi N", avatar: "S", color: "#a855f7", rating: 5, text: "Crunchy and naturally sweet. Kids love it! Fresh delivery too." }
    ]
  }
];

export const CATEGORIES = ["All", "Fruits", "Vegetables", "Coconut", "Seeds"];

export const CAT_COLORS = {
  Fruits: "#fbbf24",
  Vegetables: "#4ade80",
  Coconut: "#a3e635",
  Seeds: "#86efac",
  All: "#22c55e"
};

export const REVIEWS = [
  {
    name: "Priya Rajan",
    rating: 5,
    text: "Absolutely fresh mangoes! Got them delivered next day. The quality is exceptional – better than any supermarket.",
    avatar: "P",
    color: "#fb923c"
  },
  {
    name: "Karthik S",
    rating: 5,
    text: "Ordered coconut oil and lemon – both were farm fresh. The packaging was great and delivery was super fast!",
    avatar: "K",
    color: "#a855f7"
  },
  {
    name: "Meenakshi D",
    rating: 4,
    text: "Great organic vegetables. The tomatoes and brinjals tasted just like homegrown. Will order again every week!",
    avatar: "M",
    color: "#38bdf8"
  },
  {
    name: "Ramesh K",
    rating: 5,
    text: "Best tender coconuts I've had. Sweet water and fresh cream. Excellent service from Jaya Lakshmi Fresh Mart!",
    avatar: "R",
    color: "#4ade80"
  }
];

export const ORDER_STATUSES = ["Order Placed", "Packed", "Out for Delivery", "Delivered"];

// Coupon database
export const COUPONS = {
  FRESH10: { type: "percent", value: 10, desc: "10% off your entire order 🎉" },
  WELCOMEMART: { type: "shipping", value: 0, desc: "Free delivery on your order 🚚" },
  SAVE50: { type: "flat", value: 50, desc: "Flat ₹50 off on orders above ₹300 💰" },
  ORGANIC20: { type: "percent", value: 20, desc: "20% off on organic products 🌿" },
};
