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


    stock: 85
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


    stock: 120
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


    stock: 300
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


    stock: 200
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


    stock: 30
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


    stock: 150
  },
  {
    id: 7,
    name: "Organic Tomato",
    price: 25,
    unit: "kg",
    cat: "Vegetables",
    emoji: "🍅",
    color: "#ef4444",
    img: "https://loremflickr.com/400/400/tomato,vegetable/all",
    desc: "Vine-ripened, juicy red tomatoes. No pesticides, naturally grown in open fields.",
    farm: "Red Earth Farm, Ooty",
    weight: "500g / 1 kg / 5 kg",
    organic: true,


    stock: 400
  },
  {
    id: 8,
    name: "Green Chilli",
    price: 20,
    unit: "250g",
    cat: "Vegetables",
    emoji: "🌶️",
    color: "#16a34a",
    img: "https://loremflickr.com/400/400/chilli,pepper/all",
    desc: "Crispy, spicy green chillis for authentic South Indian flavor in every dish.",
    farm: "Spice Hill Farms",
    weight: "100g / 250g",
    organic: false,


    stock: 500
  },
  {
    id: 9,
    name: "Organic Spinach Seeds",
    price: 55,
    unit: "pack",
    cat: "Seeds",
    emoji: "🌱",
    color: "#4ade80",
    img: "https://loremflickr.com/400/400/spinach,seeds/all",
    desc: "High-germination spinach seeds. Perfect for home garden or large farm planting.",
    farm: "Seed Bank, Coimbatore",
    weight: "50g / 100g pack",
    organic: true,


    stock: 200
  },
  {
    id: 10,
    name: "Tomato Seeds (Hybrid)",
    price: 75,
    unit: "pack",
    cat: "Seeds",
    emoji: "🌿",
    color: "#f87171",
    img: "https://loremflickr.com/400/400/tomato,seeds/all",
    desc: "Premium hybrid tomato seeds with 95% germination rate. High yield, disease resistant.",
    farm: "AgriSeed Labs",
    weight: "10g pack",
    organic: false,


    stock: 150
  },
  {
    id: 11,
    name: "Coconut Oil (Cold Press)",
    price: 280,
    unit: "litre",
    cat: "Coconut",
    emoji: "🫙",
    color: "#fde68a",
    img: "https://loremflickr.com/400/400/coconut,oil/all",
    desc: "Pure cold-pressed virgin coconut oil. Rich aroma, no additives. Traditional wood press method.",
    farm: "Lakshmi Oil Mill, Palakkad",
    weight: "200ml / 500ml / 1L",
    organic: true,


    stock: 60
  },
  {
    id: 12,
    name: "Guava",
    price: 50,
    unit: "kg",
    cat: "Fruits",
    emoji: "🍐",
    color: "#86efac",
    img: "https://loremflickr.com/400/400/guava,fruit/all",
    desc: "Sweet, crunchy guavas loaded with Vitamin C. Fresh picked from farm orchards.",
    farm: "Valley Orchards, Salem",
    weight: "500g / 1 kg",
    organic: true,


    stock: 180
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

    text: "Absolutely fresh mangoes! Got them delivered next day. The quality is exceptional – better than any supermarket.",
    avatar: "P",
    color: "#fb923c"
  },
  {
    name: "Karthik S",

    text: "Ordered coconut oil and lemon – both were farm fresh. The packaging was great and delivery was super fast!",
    avatar: "K",
    color: "#a855f7"
  },
  {
    name: "Meenakshi D",

    text: "Great organic vegetables. The tomatoes and brinjals tasted just like homegrown. Will order again every week!",
    avatar: "M",
    color: "#38bdf8"
  },
  {
    name: "Ramesh K",

    text: "Best tender coconuts I've had. Sweet water and fresh cream. Excellent service from Jaya Lakshmi Fresh Mart!",
    avatar: "R",
    color: "#4ade80"
  }
];

export const ORDER_STATUSES = ["Order Placed", "Packed", "Out for Delivery", "Delivered"];
