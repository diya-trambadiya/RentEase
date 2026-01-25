const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");
const wishlistRoutes = require("./routes/wishlist");
const { errorHandler } = require("./middleware/errorMiddleware");
const authRoutes = require("./routes/auth/auth");
const registerRoutes = require("./routes/auth/register"); // Corrected this line

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/RentEase";

// Middleware
app.use(cors());  // Enable CORS for all origins (use specific origins in production)
app.use(express.json());  // To parse incoming JSON requests

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Stop the server if MongoDB connection fails
  });

// Routes
app.use("/api/auth", authRoutes);       // Will handle /login
app.use("/api/register", registerRoutes);   // Will handle /register

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);

// Catch-all route for undefined endpoints
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
