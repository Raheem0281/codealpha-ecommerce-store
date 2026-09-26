// Run with: npm run seed
// Wipes existing products and inserts sample data so you have something to show immediately
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";

dotenv.config();
connectDB();

const sampleProducts = [
  {
    name: "Wireless Headphones",
    description: "Over-ear Bluetooth headphones with noise cancellation.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "Electronics",
    stock: 25,
  },
  {
    name: "Smart Watch",
    description: "Fitness tracking smart watch with heart-rate monitor.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    category: "Electronics",
    stock: 15,
  },
  {
    name: "Leather Backpack",
    description: "Durable leather backpack, fits a 15-inch laptop.",
    price: 45.5,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    category: "Fashion",
    stock: 30,
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes with breathable mesh.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    category: "Fashion",
    stock: 40,
  },
  {
    name: "Coffee Maker",
    description: "12-cup programmable drip coffee maker.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
    category: "Home",
    stock: 20,
  },
  {
    name: "Desk Lamp",
    description: "LED desk lamp with adjustable brightness.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
    category: "Home",
    stock: 35,
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log("Sample products inserted!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
