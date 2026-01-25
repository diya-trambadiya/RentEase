const mongoose = require("mongoose")
const dotenv = require("dotenv")
const colors = require("colors")
const User = require("./models/User")
const Product = require("./models/Product")
const Order = require("./models/Order")
const Cart = require("./models/Cart")
const Wishlist = require("./models/Wishlist")
const User = require("./models/User")
const { users, products } = require("./data/seedData")

// Load env vars
dotenv.config()

// Connect to DB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/RentEase")

// Import data
const importData = async () => {
  try {
    // Clear all collections
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()
    await Cart.deleteMany()
    await Wishlist.deleteMany()

    // Insert seed data
    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log("Data Imported!".green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

// Delete data
const destroyData = async () => {
  try {
    // Clear all collections
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()
    await Cart.deleteMany()
    await Wishlist.deleteMany()

    console.log("Data Destroyed!".red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

// Check command line args
if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
