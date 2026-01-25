export const categories = [
  {
    id: 1,
    name: "Furniture",
    slug: "furniture",
    image: "/images/category-furniture.jpg",
  },
  {
    id: 2,
    name: "Electronics",
    slug: "electronics",
    image: "/images/category-electronics.avif",
  },
  {
    id: 3,
    name: "Appliances",
    slug: "appliances",
    image: "/images/category-appliances.jpg",
  },
  {
    id: 4,
    name: "Bedroom",
    slug: "bedroom",
    image: "/images/category-bedroom.jpg",
  },
  {
    id: 5,
    name: "Kitchen",
    slug: "kitchen",
    image: "/images/category-kitchen.jpg",
  },
]

export const products = [
  // ELECTRONICS
  {
    id: 1,
    name: "32-inch LED Smart TV",
    category: "electronics",
    shortDescription: "Perfect for small rooms and PG accommodations",
    description:
      "This 32-inch LED Smart TV is perfect for small living spaces like PG accommodations and rented apartments. Enjoy your favorite shows and movies with crisp HD resolution and smart features that let you access popular streaming platforms.",
    image: "/images/product-ledtv.avif",
    priceDaily: 99,
    priceWeekly: 599,
    priceMonthly: 1499,
    rating: 4,
    reviews: 42,
    features: ["HD Resolution", "Smart TV", "2 HDMI Ports", "Netflix & Prime Video"],
    benefits: [
      "Perfect size for small rooms and PG accommodations",
      "Access to streaming platforms without additional devices",
      "Low power consumption",
      "Easy setup with minimal space requirements",
    ],
    specifications: {
      display: {
        "Screen Size": "32 inches",
        Resolution: "1366 x 768 (HD)",
        "Panel Type": "LED",
      },
      connectivity: {
        "HDMI Ports": "2",
        "USB Ports": "1",
        "Wi-Fi": "Yes",
        Bluetooth: "Yes",
      },
      audio: {
        Output: "20W",
        Speakers: "2",
      },
      dimensions: {
        "Without Stand": "73.2 x 43.5 x 8.1 cm",
        "With Stand": "73.2 x 47.3 x 18.0 cm",
        Weight: "4.2 kg",
      },
    },
    reviewList: [
      {
        name: "Rahul M.",
        avatar: "/images/avatar-1.jpg",
        date: "2 months ago",
        rating: 5,
        rentalPeriod: "3 months",
        comment:
          "Perfect TV for my PG room. The size is just right and the smart features work great. Setup was easy and the RentEase team was very helpful.",
      },
      {
        name: "Priya S.",
        avatar: "/images/avatar-2.jpg",
        date: "1 month ago",
        rating: 4,
        rentalPeriod: "6 months",
        comment:
          "Good TV for the price. Picture quality is decent and the smart features are convenient. Only issue is the remote which feels a bit cheap.",
      },
    ],
    faqs: [
      {
        question: "Does it come with a wall mount?",
        answer: "Yes, we provide a standard wall mount with the TV. Our team will install it for you at no extra cost.",
      },
      {
        question: "Can I connect my laptop to this TV?",
        answer: "Yes, you can connect your laptop using the HDMI port. The TV has 2 HDMI ports available.",
      },
      {
        question: "Does it have built-in Netflix and other apps?",
        answer: "Yes, this Smart TV comes with pre-installed apps including Netflix, Prime Video, YouTube, and more.",
      },
    ],
  },
  {
    id: 2,
    name: "Refrigerator (190L)",
    category: "appliances",
    shortDescription: "Compact refrigerator ideal for small apartments and PG",
    description:
      "This 190L refrigerator is perfect for individuals or couples living in rented apartments or PG accommodations. It offers ample storage space while maintaining a compact footprint that fits well in small kitchens.",
    image: "/images/product-refrigrator.avif",
    priceDaily: 120,
    priceWeekly: 699,
    priceMonthly: 1999,
    rating: 5,
    reviews: 58,
    features: ["190L Capacity", "Energy Efficient", "Auto Defrost", "Adjustable Shelves"],
    benefits: [
      "Perfect size for 1-2 people",
      "Energy-efficient design saves on electricity bills",
      "Adjustable shelves for flexible storage",
      "Low noise operation ideal for small living spaces",
    ],
    specifications: {
      general: {
        Capacity: "190 Liters",
        Type: "Single Door",
        "Defrost System": "Auto Defrost",
        "Cooling Technology": "Direct Cool",
      },
      performance: {
        "Energy Rating": "3 Star",
        "Annual Energy Consumption": "210 kWh",
        "Compressor Type": "Reciprocatory",
      },
      storage: {
        Shelves: "2 (Adjustable)",
        "Door Bins": "3",
        "Vegetable Drawer": "1 Large",
        "Freezer Capacity": "20 Liters",
      },
      dimensions: {
        Height: "1210 mm",
        Width: "550 mm",
        Depth: "635 mm",
        Weight: "32 kg",
      },
    },
    reviewList: [
      {
        name: "Aditya K.",
        avatar: "/images/avatar-3.jpg",
        date: "3 months ago",
        rating: 5,
        rentalPeriod: "12 months",
        comment:
          "Perfect size for my studio apartment. Runs quietly and keeps everything cold. The freezer section is small but adequate for basic needs.",
      },
      {
        name: "Neha R.",
        avatar: "/images/avatar-4.jpg",
        date: "2 months ago",
        rating: 5,
        rentalPeriod: "6 months",
        comment:
          "Great fridge for PG accommodation. Energy efficient and doesn't take up too much space. Delivery and installation were smooth.",
      },
    ],
    faqs: [
      {
        question: "Is stabilizer required for this refrigerator?",
        answer:
          "This refrigerator has built-in stabilizer that works for voltage range of 130V-290V. However, in areas with extreme voltage fluctuations, an external stabilizer is recommended.",
      },
      {
        question: "How long does it take to cool after first installation?",
        answer: "The refrigerator typically takes 2-3 hours to reach optimal cooling temperature after installation.",
      },
      {
        question: "Can I adjust the temperature settings?",
        answer: "Yes, the refrigerator comes with adjustable temperature control knob with multiple settings.",
      },
    ],
  },
  {
    id: 3,
    name: "Washing Machine (6.5kg)",
    category: "appliances",
    shortDescription: "Semi-automatic washing machine perfect for bachelors",
    description:
      "This 6.5kg semi-automatic washing machine is ideal for bachelors, couples, or small families living in rented accommodations. It's easy to use, requires minimal water and electricity, and gets your clothes clean with minimal effort.",
    image: "/images/product-washingmachine.jpg",
    priceDaily: 110,
    priceWeekly: 649,
    priceMonthly: 1799,
    rating: 4,
    reviews: 37,
    features: ["6.5kg Capacity", "Semi-Automatic", "Separate Wash & Dry Tubs", "Castor Wheels"],
    benefits: [
      "Perfect for bachelors and small families",
      "Saves water compared to fully-automatic machines",
      "Portable design with castor wheels",
      "No plumbing required - can be used anywhere",
    ],
    specifications: {
      general: {
        Capacity: "6.5 kg",
        Type: "Semi-Automatic",
        Operation: "Top Load",
        Color: "White & Blue",
      },
      performance: {
        "Wash Programs": "3",
        "Wash Timer": "Up to 15 minutes",
        "Spin Timer": "Up to 5 minutes",
        "Motor Type": "Heavy Duty",
      },
      features: {
        "Castor Wheels": "Yes",
        "Lint Filter": "Yes",
        Buzzer: "Yes",
        "Water Inlet": "Manual Fill",
      },
      dimensions: {
        Height: "980 mm",
        Width: "800 mm",
        Depth: "480 mm",
        Weight: "18 kg",
      },
    },
    reviewList: [
      {
        name: "Vikram S.",
        avatar: "/images/avatar-5.jpg",
        date: "1 month ago",
        rating: 4,
        rentalPeriod: "3 months",
        comment:
          "Great washing machine for bachelors. Easy to use and doesn't require plumbing. The spin dryer works well too. Only downside is you need to manually fill water.",
      },
      {
        name: "Anjali P.",
        avatar: "/images/avatar-6.jpg",
        date: "2 months ago",
        rating: 5,
        rentalPeriod: "6 months",
        comment:
          "Perfect for my PG accommodation. I can easily move it around thanks to the wheels. Cleans clothes well and the spin dry feature saves a lot of drying time.",
      },
    ],
    faqs: [
      {
        question: "Does it require plumbing installation?",
        answer:
          "No, this is a semi-automatic washing machine that doesn't require permanent plumbing. You manually fill water in the wash tub and drain it using the drain pipe.",
      },
      {
        question: "How many clothes can I wash in one load?",
        answer: "The 6.5kg capacity is suitable for approximately 6-7 medium-sized garments in one load.",
      },
      {
        question: "Does it have both washing and drying functions?",
        answer:
          "Yes, it has separate tubs for washing and spin-drying. The spin dryer removes excess water but doesn't completely dry the clothes.",
      },
    ],
  },
  {
    id: 4,
    name: "Microwave Oven (20L)",
    category: "appliances",
    shortDescription: "Compact microwave perfect for quick meals in PG accommodations",
    description:
      "This 20L microwave oven is perfect for students and working professionals living in PG accommodations or rented apartments. It's ideal for reheating meals, defrosting, and basic cooking with multiple auto-cook menus.",
    image: "/images/product-microwave.jpg",
    priceDaily: 80,
    priceWeekly: 449,
    priceMonthly: 1299,
    rating: 4,
    reviews: 45,
    features: ["20L Capacity", "Solo Microwave", "5 Power Levels", "Auto-Cook Menus"],
    benefits: [
      "Perfect size for individual use",
      "Quick reheating and defrosting",
      "Multiple auto-cook options for easy meal preparation",
      "Compact design fits in small kitchens",
    ],
    specifications: {
      general: {
        Capacity: "20 Liters",
        Type: "Solo Microwave",
        Control: "Mechanical Knob",
        Color: "White",
      },
      performance: {
        "Power Output": "700 Watts",
        "Power Levels": "5",
        Timer: "Up to 30 minutes",
        "Auto-Cook Menus": "8",
      },
      features: {
        "Defrost Function": "Yes",
        "Child Lock": "No",
        "Cooking End Signal": "Yes",
        "Interior Light": "Yes",
      },
      dimensions: {
        Height: "256 mm",
        Width: "439 mm",
        Depth: "340 mm",
        Weight: "10.5 kg",
      },
    },
    reviewList: [
      {
        name: "Karan M.",
        avatar: "/images/avatar-7.jpg",
        date: "2 months ago",
        rating: 4,
        rentalPeriod: "6 months",
        comment:
          "Perfect for my PG room. I use it daily to heat up meals and make simple dishes. The auto-cook menus are quite helpful.",
      },
      {
        name: "Shreya D.",
        avatar: "/images/avatar-8.jpg",
        date: "3 months ago",
        rating: 3,
        rentalPeriod: "3 months",
        comment:
          "It's good for basic use like reheating and defrosting. The capacity is enough for one person. Wish it had a grill function though.",
      },
    ],
    faqs: [
      {
        question: "Can I cook rice in this microwave?",
        answer:
          "Yes, you can cook rice using a microwave-safe container with lid. The microwave has an auto-cook menu for rice as well.",
      },
      {
        question: "Is it suitable for grilling or baking?",
        answer:
          "No, this is a solo microwave which is designed for reheating, defrosting and basic cooking. It doesn't have grill or convection functions.",
      },
      {
        question: "What's the power consumption?",
        answer:
          "The microwave consumes approximately 1200 watts of power during operation, but the actual cooking power output is 700 watts.",
      },
    ],
  },
  {
    id: 5,
    name: "Induction Cooktop",
    category: "kitchen",
    shortDescription: "Portable cooking solution for PG and hostel rooms",
    description:
      "This portable induction cooktop is perfect for students and professionals living in PG accommodations where gas cooking isn't available. It's safe, energy-efficient, and heats up quickly for all your basic cooking needs.",
    image: "/images/product-inductiontop.jpg",
    priceDaily: 50,
    priceWeekly: 299,
    priceMonthly: 899,
    rating: 5,
    reviews: 63,
    features: ["1800W Power", "10 Temperature Settings", "Auto Shut-off", "Timer Function"],
    benefits: [
      "Safe alternative to gas stoves for PG rooms",
      "Energy efficient and fast heating",
      "Multiple temperature settings for different cooking needs",
      "Portable and easy to store when not in use",
    ],
    specifications: {
      general: {
        Power: "1800 Watts",
        "Control Type": "Touch Panel",
        Display: "LED",
        Color: "Black",
      },
      performance: {
        "Temperature Range": "80°C - 270°C",
        "Temperature Settings": "10",
        Timer: "Up to 3 hours",
        "Preset Cooking Modes": "6",
      },
      features: {
        "Auto Shut-off": "Yes",
        "Child Lock": "Yes",
        "Overheat Protection": "Yes",
        "Compatible Cookware": "Iron, Steel, Cast Iron",
      },
      dimensions: {
        Length: "350 mm",
        Width: "280 mm",
        Height: "65 mm",
        Weight: "2.5 kg",
      },
    },
    reviewList: [
      {
        name: "Rohan K.",
        avatar: "/images/avatar-9.jpg",
        date: "1 month ago",
        rating: 5,
        rentalPeriod: "12 months",
        comment:
          "This induction cooktop is a lifesaver in my PG where gas cooking isn't allowed. Heats up quickly and the preset modes are very useful.",
      },
      {
        name: "Meera J.",
        avatar: "/images/avatar-10.jpg",
        date: "2 months ago",
        rating: 5,
        rentalPeriod: "6 months",
        comment:
          "Perfect for basic cooking needs. I use it daily for making breakfast and dinner. The auto shut-off feature gives peace of mind.",
      },
    ],
    faqs: [
      {
        question: "What type of cookware can I use with this induction cooktop?",
        answer:
          "You can use cookware made of iron, steel, or cast iron that's compatible with induction cooking. If a magnet sticks to the bottom of your cookware, it will work with this induction cooktop.",
      },
      {
        question: "Is it safe to use in a PG accommodation?",
        answer:
          "Yes, it's very safe as there's no open flame. It also has safety features like auto shut-off and overheat protection.",
      },
      {
        question: "How much electricity does it consume?",
        answer:
          "The induction cooktop has a maximum power of 1800W, but actual consumption depends on the temperature setting used. It's generally more energy-efficient than conventional electric cooktops.",
      },
    ],
  },
  // Additional products
  {
    id: 13,
    name: "Coffee Maker",
    category: "kitchen",
    shortDescription: "Brew fresh coffee in your PG room",
    description:
      "This compact coffee maker is perfect for coffee lovers living in PG accommodations. Brew fresh coffee every morning without having to step out.",
    image: "/images/product-coffeemaker.jpg",
    priceDaily: 45,
    priceWeekly: 250,
    priceMonthly: 750,
    rating: 4.5,
    reviews: 38,
    features: ["600ml Capacity", "Automatic Shut-off", "Anti-drip Function", "Reusable Filter"],
    benefits: [
      "Save money on cafe-bought coffee",
      "Brew fresh coffee in minutes",
      "Compact design perfect for small spaces",
      "Easy to clean and maintain",
    ],
    specifications: {
      general: {
        Capacity: "600ml (4-5 cups)",
        Power: "650 Watts",
        Material: "Plastic with Stainless Steel Accents",
        Color: "Black/Silver",
      },
      features: {
        "Brewing Time": "5-7 minutes",
        "Keep Warm Function": "30 minutes",
        "Water Level Indicator": "Yes",
        "Filter Type": "Reusable Mesh",
      },
      dimensions: {
        Height: "30 cm",
        Width: "20 cm",
        Depth: "15 cm",
        Weight: "1.8 kg",
      },
    },
    reviewList: [
      {
        name: "Arjun T.",
        avatar: "/images/avatar-11.jpg",
        date: "1 month ago",
        rating: 5,
        rentalPeriod: "3 months",
        comment: "Perfect for my morning coffee routine. Compact and works great!",
      },
      {
        name: "Sanya M.",
        avatar: "/images/avatar-12.jpg",
        date: "2 months ago",
        rating: 4,
        rentalPeriod: "1 month",
        comment: "Good coffee maker for the price. Easy to use and clean.",
      },
    ],
    faqs: [
      {
        question: "Can I make tea in this coffee maker?",
        answer: "Yes, you can brew tea using tea bags or loose tea leaves in the filter basket.",
      },
      {
        question: "Does it come with a coffee mug?",
        answer: "No, mugs are not included. You'll need to use your own mugs or cups.",
      },
    ],
  },
  {
    id: 14,
    name: "Bluetooth Speaker",
    category: "electronics",
    shortDescription: "Portable wireless speaker for music lovers",
    description:
      "This portable Bluetooth speaker delivers impressive sound quality in a compact form factor. Perfect for music lovers in PG accommodations who want to enjoy their favorite tunes without disturbing others.",
    image: "/images/product-bluetooth.jpg",
    priceDaily: 40,
    priceWeekly: 220,
    priceMonthly: 699,
    rating: 4.5,
    reviews: 52,
    features: ["10W Output", "Bluetooth 5.0", "8-hour Battery Life", "Water Resistant"],
    benefits: [
      "Enjoy music anywhere in your room",
      "Connect wirelessly to your phone or laptop",
      "Compact and portable design",
      "Rechargeable battery for cordless use",
    ],
    specifications: {
      general: {
        "Output Power": "10 Watts",
        "Bluetooth Version": "5.0",
        "Battery Capacity": "2000mAh",
        "Charging Time": "2-3 hours",
      },
      audio: {
        "Frequency Response": "80Hz-20kHz",
        "Signal-to-Noise Ratio": ">75dB",
        "Driver Size": "45mm",
        Impedance: "4 ohms",
      },
      features: {
        "Water Resistance": "IPX5",
        Microphone: "Built-in for calls",
        Controls: "On-device buttons",
        Connectivity: "Bluetooth, AUX, MicroSD",
      },
      dimensions: {
        Diameter: "8 cm",
        Height: "10 cm",
        Weight: "350g",
      },
    },
    reviewList: [
      {
        name: "Varun S.",
        avatar: "/images/avatar-13.jpg",
        date: "2 months ago",
        rating: 5,
        rentalPeriod: "2 months",
        comment: "Great sound quality for its size. Battery lasts a full day of use.",
      },
      {
        name: "Tanya R.",
        avatar: "/images/avatar-14.jpg",
        date: "1 month ago",
        rating: 4,
        rentalPeriod: "1 month",
        comment: "Compact and portable. Sound is good but bass could be better.",
      },
    ],
    faqs: [
      {
        question: "Can I connect two devices simultaneously?",
        answer: "No, this speaker can only connect to one Bluetooth device at a time.",
      },
      {
        question: "Is it suitable for outdoor use?",
        answer: "Yes, it has IPX5 water resistance which protects against splashes and light rain.",
      },
    ],
  },
  {
    id: 15,
    name: "Study Lamp",
    category: "furniture",
    shortDescription: "Adjustable LED desk lamp for studying",
    description:
      "This adjustable LED study lamp provides optimal lighting for reading and studying. With multiple brightness levels and color temperatures, it helps reduce eye strain during long study sessions.",
    image: "/images/product-studylamp.jpg",
    priceDaily: 25,
    priceWeekly: 150,
    priceMonthly: 450,
    rating: 4.8,
    reviews: 75,
    features: ["Adjustable Arm", "3 Color Modes", "5 Brightness Levels", "USB Charging Port"],
    benefits: [
      "Reduce eye strain during long study sessions",
      "Adjustable positioning for optimal lighting",
      "Energy-efficient LED technology",
      "Compact design saves desk space",
    ],
    specifications: {
      general: {
        "Light Source": "LED",
        Power: "9 Watts",
        "Color Temperature": "3000K-6000K",
        Lifespan: "50,000 hours",
      },
      features: {
        "Color Modes": "Warm White, Cool White, Natural White",
        "Brightness Levels": "5 levels",
        "USB Port": "5V/1A output",
        "Touch Control": "Yes",
      },
      dimensions: {
        "Base Diameter": "12 cm",
        Height: "40 cm (fully extended)",
        "Arm Length": "30 cm",
        Weight: "0.8 kg",
      },
    },
    reviewList: [
      {
        name: "Rishi K.",
        avatar: "/images/avatar-15.jpg",
        date: "3 months ago",
        rating: 5,
        rentalPeriod: "6 months",
        comment: "Perfect study lamp. The different light modes help me study for long hours without eye strain.",
      },
      {
        name: "Ananya P.",
        avatar: "/images/avatar-16.jpg",
        date: "2 months ago",
        rating: 5,
        rentalPeriod: "3 months",
        comment: "The USB charging port is very convenient. Light quality is excellent.",
      },
    ],
    faqs: [
      {
        question: "Can I charge my phone using the USB port?",
        answer: "Yes, the lamp has a 5V/1A USB port that can charge smartphones and other small devices.",
      },
      {
        question: "Does it have a timer function?",
        answer: "No, this model doesn't have a built-in timer function.",
      },
    ],
  },
  {
    id: 16,
    name: "Electric Kettle",
    category: "kitchen",
    shortDescription: "Fast boiling kettle for instant beverages",
    description:
      "This electric kettle is perfect for making instant coffee, tea, or noodles in your PG room. With rapid boiling technology, it heats water in minutes and features auto shut-off for safety.",
    image: "/images/product-electrickettle.webp",
    priceDaily: 30,
    priceWeekly: 180,
    priceMonthly: 550,
    rating: 4.6,
    reviews: 89,
    features: ["1.5L Capacity", "1500W Power", "Auto Shut-off", "Boil-Dry Protection"],
    benefits: [
      "Boil water in 3-5 minutes",
      "Make instant beverages and meals",
      "Safe to use with multiple protection features",
      "Cordless design for easy pouring",
    ],
    specifications: {
      general: {
        Capacity: "1.5 Liters",
        Power: "1500 Watts",
        Material: "Stainless Steel",
        Voltage: "220-240V",
      },
      features: {
        "Heating Element": "Concealed",
        "Auto Shut-off": "Yes",
        "Boil-Dry Protection": "Yes",
        "Cordless Operation": "Yes",
      },
      dimensions: {
        Height: "22 cm",
        Diameter: "15 cm",
        Weight: "1 kg",
      },
    },
    reviewList: [
      {
        name: "Nikhil S.",
        avatar: "/images/avatar-17.jpg",
        date: "1 month ago",
        rating: 5,
        rentalPeriod: "2 months",
        comment: "Heats water super fast. Perfect for making instant noodles and coffee in my PG room.",
      },
      {
        name: "Priyanka M.",
        avatar: "/images/avatar-18.jpg",
        date: "2 months ago",
        rating: 4,
        rentalPeriod: "3 months",
        comment: "Works well and is easy to clean. The auto shut-off feature is very useful.",
      },
    ],
    faqs: [
      {
        question: "Can I boil milk in this kettle?",
        answer:
          "No, this kettle is designed for boiling water only. Boiling milk may damage the heating element and is not recommended.",
      },
      {
        question: "How long does it take to boil 1 liter of water?",
        answer:
          "It takes approximately 3-4 minutes to boil 1 liter of water, depending on the initial water temperature.",
      },
    ],
  },
  {
    id: 17,
    name: "Center Table",
    category: "furniture",
    shortDescription: "Compact nightstand with storage for small spaces",
    description:
      "This compact bedside table is perfect for PG accommodations and small bedrooms. It provides convenient storage for your essentials while taking minimal floor space.",
    image: "/images/product-centertable.jpeg",
    priceDaily: 35,
    priceWeekly: 200,
    priceMonthly: 600,
    rating: 4.3,
    reviews: 47,
    features: ["Drawer Storage", "Open Shelf", "Compact Design", "Easy Assembly"],
    benefits: [
      "Keep essentials within reach while in bed",
      "Storage drawer for private items",
      "Open shelf for books and frequently used items",
      "Space-saving design for small rooms",
    ],
    specifications: {
      general: {
        Material: "Engineered Wood",
        Color: "Walnut Brown",
        Assembly: "Required (tools included)",
        "Weight Capacity": "15 kg",
      },
      storage: {
        "Drawer Dimensions": "25 x 30 x 10 cm",
        "Shelf Dimensions": "30 x 30 cm",
        "Drawer Slides": "Smooth Metal Runners",
      },
      dimensions: {
        Height: "50 cm",
        Width: "35 cm",
        Depth: "35 cm",
        Weight: "8 kg",
      },
    },
    reviewList: [
      {
        name: "Arun T.",
        avatar: "/images/avatar-19.jpg",
        date: "2 months ago",
        rating: 4,
        rentalPeriod: "6 months",
        comment: "Perfect size for my small PG room. Assembly was easy and it looks good.",
      },
      {
        name: "Kavita D.",
        avatar: "/images/avatar-20.jpg",
        date: "3 months ago",
        rating: 5,
        rentalPeriod: "12 months",
        comment: "The drawer is spacious enough for my medicines and personal items. Very sturdy construction.",
      },
    ],
    faqs: [
      {
        question: "Does it require assembly?",
        answer: "Yes, assembly is required but it's simple and all necessary tools and instructions are provided.",
      },
      {
        question: "Can it support a table lamp and alarm clock?",
        answer:
          "Yes, the top surface can easily support items like a table lamp, alarm clock, and other small items with a combined weight of up to 15 kg.",
      },
    ],
  },
  {
    id: 19,
    name: "Desk Organizer",
    category: "furniture",
    shortDescription: "Multi-compartment organizer for study desk",
    description:
      "Keep your study desk neat and organized with this multi-compartment desk organizer. Perfect for students and professionals in PG accommodations who need to maximize their limited desk space.",
    image: "/images/product-deskorganizer.webp",
    priceDaily: 15,
    priceWeekly: 90,
    priceMonthly: 250,
    rating: 4.4,
    reviews: 38,
    features: ["Multiple Compartments", "Pen Holder", "Letter Tray", "Drawer Storage"],
    benefits: [
      "Keep stationery and supplies organized",
      "Maximize limited desk space",
      "Find items quickly when needed",
      "Reduce desk clutter for better focus",
    ],
    specifications: {
      general: {
        Material: "Mesh Metal",
        Color: "Black",
        Assembly: "No assembly required",
        Style: "Modern",
      },
      compartments: {
        "Pen Holders": "3",
        "Letter Trays": "2",
        "Small Drawers": "1",
        "Sticky Note Compartment": "1",
      },
      dimensions: {
        Height: "30 cm",
        Width: "25 cm",
        Depth: "15 cm",
        Weight: "0.8 kg",
      },
    },
    reviewList: [
      {
        name: "Rahul J.",
        avatar: "/images/avatar-23.jpg",
        date: "2 months ago",
        rating: 4,
        rentalPeriod: "6 months",
        comment: "Helps keep my small desk organized. The multiple compartments are very useful.",
      },
      {
        name: "Sneha K.",
        avatar: "/images/avatar-24.jpg",
        date: "1 month ago",
        rating: 5,
        rentalPeriod: "3 months",
        comment: "Perfect for organizing stationery and small items. Sturdy construction and looks good on my desk.",
      },
    ],
    faqs: [
      {
        question: "Can it hold A4 size papers?",
        answer: "Yes, the letter trays are designed to hold A4 size papers and documents.",
      },
      {
        question: "Is it stackable with other organizers?",
        answer: "No, this particular model is not designed to be stacked with other organizers.",
      },
    ],
  },
  {
    id: 20,
    name: "Room Heater",
    category: "appliances",
    shortDescription: "Portable heater for winter comfort in PG rooms",
    description:
      "Stay warm during winter months with this portable room heater. Perfect for PG accommodations and small rooms, it provides efficient heating with safety features.",
    image: "/images/product-roomheater.jpeg",
    priceDaily: 60,
    priceWeekly: 350,
    priceMonthly: 1000,
    rating: 4.5,
    reviews: 72,
    features: ["2000W Power", "2 Heat Settings", "Adjustable Thermostat", "Safety Tip-over Switch"],
    benefits: [
      "Stay warm during cold winter months",
      "Portable design to heat any area of your room",
      "Multiple heat settings for comfort control",
      "Safety features for worry-free use",
    ],
    specifications: {
      general: {
        Power: "2000 Watts",
        "Heating Element": "PTC Ceramic",
        "Heat Settings": "2 (1000W/2000W)",
        Voltage: "220-240V",
      },
      features: {
        Thermostat: "Adjustable",
        "Safety Features": "Overheat Protection, Tip-over Switch",
        "Indicator Light": "Yes",
        Handle: "Built-in for portability",
      },
      dimensions: {
        Height: "30 cm",
        Width: "25 cm",
        Depth: "15 cm",
        Weight: "2.5 kg",
      },
    },
    reviewList: [
      {
        name: "Vikrant M.",
        avatar: "/images/avatar-1.jpg",
        date: "1 month ago",
        rating: 5,
        rentalPeriod: "3 months",
        comment: "Excellent heater for my PG room. Heats up the space quickly and the thermostat works well.",
      },
      {
        name: "Nisha P.",
        avatar: "/images/avatar-2.jpg",
        date: "2 months ago",
        rating: 4,
        rentalPeriod: "2 months",
        comment: "Good heating capacity. I like the safety features, especially the tip-over switch.",
      },
    ],
    faqs: [
      {
        question: "How large a room can this heater warm?",
        answer:
          "This heater is suitable for rooms up to 150-200 square feet, depending on insulation and ceiling height.",
      },
      {
        question: "Is it safe to leave it on overnight?",
        answer:
          "While the heater has safety features like overheat protection and tip-over switch, we recommend not leaving it unattended for extended periods, especially while sleeping.",
      },
    ],
  },
  // FURNITURE ITEMS
  {
    id: 21,
    name: "3-Seater Sofa",
    category: "furniture",
    shortDescription: "Comfortable sofa perfect for small living rooms",
    description:
      "This stylish 3-seater sofa is perfect for small living rooms in rented apartments and PG accommodations. It features comfortable cushioning and durable upholstery that's easy to clean.",
    image: "/images/product-sofa.avif",
    priceDaily: 150,
    priceWeekly: 900,
    priceMonthly: 2500,
    rating: 4.7,
    reviews: 58,
    features: ["Comfortable Cushioning", "Durable Fabric", "Wooden Frame", "Easy to Clean"],
    benefits: [
      "Creates a cozy living space instantly",
      "Comfortable seating for guests",
      "Versatile design fits most decor styles",
      "Compact size perfect for small apartments",
    ],
    specifications: {
      general: {
        "Seating Capacity": "3 People",
        "Frame Material": "Solid Wood",
        Upholstery: "Polyester Fabric",
        Color: "Grey",
      },
      dimensions: {
        Length: "180 cm",
        Width: "80 cm",
        Height: "85 cm",
        "Seat Height": "45 cm",
      },
      features: {
        Armrests: "Yes",
        "Removable Covers": "Yes",
        "Assembly Required": "Minimal",
        "Weight Capacity": "300 kg",
      },
    },
    reviewList: [
      {
        name: "Vikram M.",
        avatar: "/images/avatar-11.jpg",
        date: "2 months ago",
        rating: 5,
        rentalPeriod: "6 months",
        comment:
          "Very comfortable sofa that transformed my living room. The fabric is easy to clean which is great for a rental.",
      },
      {
        name: "Priya K.",
        avatar: "/images/avatar-12.jpg",
        date: "3 months ago",
        rating: 4,
        rentalPeriod: "12 months",
        comment: "Good quality sofa for the rental price. Delivery and setup were hassle-free.",
      },
    ],
    faqs: [
      {
        question: "Is the sofa cover washable?",
        answer: "Yes, the sofa comes with removable covers that can be machine washed on a gentle cycle.",
      },
      {
        question: "Does it require assembly?",
        answer: "Minimal assembly is required. Our delivery team will set it up for you at no extra cost.",
      },
    ],
  },
  {
    id: 22,
    name: "Dining Table Set (4 Seater)",
    category: "furniture",
    shortDescription: "Compact dining set for small apartments",
    description:
      "This 4-seater dining table set is perfect for small apartments and PG accommodations. The compact design saves space while providing comfortable seating for meals and work.",
    image: "/images/product-dinningtable.avif",
    priceDaily: 120,
    priceWeekly: 700,
    priceMonthly: 2000,
    rating: 4.5,
    reviews: 42,
    features: ["4 Chairs Included", "Sturdy Construction", "Easy to Clean", "Space-Saving Design"],
    benefits: [
      "Perfect for small dining areas",
      "Versatile use for dining and work",
      "Easy to maintain",
      "Creates a proper dining space in your rental",
    ],
    specifications: {
      general: {
        "Seating Capacity": "4 People",
        "Table Material": "Engineered Wood",
        "Chair Material": "Wood with Cushioned Seat",
        Color: "Walnut Brown",
      },
      dimensions: {
        "Table Length": "120 cm",
        "Table Width": "75 cm",
        "Table Height": "75 cm",
        "Chair Dimensions": "45 x 45 x 90 cm (WxDxH)",
      },
      features: {
        "Assembly Required": "Yes",
        Foldable: "No",
        "Weight Capacity (Table)": "50 kg",
        "Weight Capacity (Each Chair)": "100 kg",
      },
    },
    reviewList: [
      {
        name: "Rahul S.",
        avatar: "/images/avatar-13.jpg",
        date: "1 month ago",
        rating: 5,
        rentalPeriod: "6 months",
        comment: "Perfect size for my small apartment. The chairs are comfortable and the table is sturdy.",
      },
      {
        name: "Anita P.",
        avatar: "/images/avatar-14.jpg",
        date: "2 months ago",
        rating: 4,
        rentalPeriod: "3 months",
        comment: "Good quality dining set. I use it for both meals and as a work desk.",
      },
    ],
    faqs: [
      {
        question: "Can the chairs be stacked for storage?",
        answer:
          "No, these chairs are not designed to be stacked. However, they can be pushed completely under the table when not in use to save space.",
      },
      {
        question: "Is the table surface heat-resistant?",
        answer:
          "The table has a moderate heat resistance, but we recommend using placemats or coasters for hot dishes to prevent any damage to the surface.",
      },
    ],
  },
  {
    id: 23,
    name: "Bookshelf (5 Tier)",
    category: "furniture",
    shortDescription: "Versatile storage solution for books and decor",
    description:
      "This 5-tier bookshelf provides ample storage space for books, decor items, and essentials in your rented apartment or PG accommodation. The modern design adds style to any room.",
    image: "/images/product-bookself.avif",
    priceDaily: 70,
    priceWeekly: 400,
    priceMonthly: 1200,
    rating: 4.6,
    reviews: 35,
    features: ["5 Shelves", "Modern Design", "Easy Assembly", "Sturdy Construction"],
    benefits: [
      "Maximize vertical storage space",
      "Display books and decorative items",
      "Keep essentials organized",
      "Add style to your rental space",
    ],
    specifications: {
      general: {
        "Number of Shelves": "5",
        Material: "Engineered Wood with Metal Frame",
        Color: "Oak/Black",
        Style: "Modern",
      },
      dimensions: {
        Height: "180 cm",
        Width: "80 cm",
        Depth: "30 cm",
        Weight: "15 kg",
      },
      features: {
        "Assembly Required": "Yes",
        "Tools Included": "Yes",
        "Weight Capacity (Per Shelf)": "15 kg",
        "Adjustable Shelves": "No",
      },
    },
    reviewList: [
      {
        name: "Deepak R.",
        avatar: "/images/avatar-15.jpg",
        date: "2 months ago",
        rating: 5,
        rentalPeriod: "12 months",
        comment: "Great bookshelf that holds all my books and some decorative items. Assembly was straightforward.",
      },
      {
        name: "Meena T.",
        avatar: "/images/avatar-16.jpg",
        date: "1 month ago",
        rating: 4,
        rentalPeriod: "6 months",
        comment: "Sturdy bookshelf that looks good in my apartment. Good value for the rental price.",
      },
    ],
    faqs: [
      {
        question: "How difficult is the assembly?",
        answer:
          "Assembly is relatively simple and takes about 30-45 minutes. All necessary tools and instructions are provided, and our delivery team can assist with assembly if needed.",
      },
      {
        question: "Can it be placed against a wall without anchoring?",
        answer:
          "Yes, the bookshelf is stable enough to stand against a wall without anchoring. However, for safety, especially in homes with children, we recommend using the included wall anchors.",
      },
    ],
  },
  {
    id: 24,
    name: "Accent Chair",
    category: "furniture",
    shortDescription: "Stylish chair for living room or bedroom",
    description:
      "This stylish accent chair adds both comfort and style to any room in your rented apartment. Perfect as additional seating in the living room or as a reading chair in the bedroom.",
    image: "/images/product-accentchair.avif",
    priceDaily: 60,
    priceWeekly: 350,
    priceMonthly: 1000,
    rating: 4.4,
    reviews: 28,
    features: ["Comfortable Padding", "Stylish Design", "Sturdy Frame", "Easy to Clean"],
    benefits: [
      "Add extra seating to your living space",
      "Create a cozy reading nook",
      "Enhance your room's aesthetic",
      "Versatile use in different rooms",
    ],
    specifications: {
      general: {
        Type: "Accent Chair",
        "Frame Material": "Solid Wood",
        Upholstery: "Polyester Fabric",
        Color: "Teal Blue",
      },
      dimensions: {
        Width: "70 cm",
        Depth: "75 cm",
        Height: "85 cm",
        "Seat Height": "45 cm",
      },
      features: {
        Armrests: "Yes",
        "Cushion Type": "High-Density Foam",
        "Assembly Required": "Minimal",
        "Weight Capacity": "120 kg",
      },
    },
    reviewList: [
      {
        name: "Sanjay M.",
        avatar: "/images/avatar-17.jpg",
        date: "3 months ago",
        rating: 4,
        rentalPeriod: "3 months",
        comment:
          "Comfortable chair that adds a pop of color to my otherwise neutral apartment. Good quality for a rental.",
      },
      {
        name: "Ritu K.",
        avatar: "/images/avatar-18.jpg",
        date: "2 months ago",
        rating: 5,
        rentalPeriod: "6 months",
        comment:
          "I use this as a reading chair in my bedroom and it's perfect. Very comfortable for long reading sessions.",
      },
    ],
    faqs: [
      {
        question: "Is the fabric stain-resistant?",
        answer:
          "The fabric has a standard stain resistance. We recommend promptly cleaning any spills with a damp cloth and mild soap to prevent staining.",
      },
      {
        question: "Can I request a different color?",
        answer:
          "Yes, this chair is available in several colors including grey, beige, and green. You can request your preferred color during checkout, subject to availability.",
      },
    ],
  },
  {
    id: 25,
    name: "Coffee Table",
    category: "furniture",
    shortDescription: "Modern coffee table with storage",
    description:
      "This modern coffee table combines style with functionality, featuring a sleek design and hidden storage compartment. Perfect for small living rooms in rented apartments.",
    image: "/images/product-coffeetable.avif",
    priceDaily: 50,
    priceWeekly: 300,
    priceMonthly: 900,
    rating: 4.3,
    reviews: 32,
    features: ["Hidden Storage", "Modern Design", "Durable Construction", "Easy Assembly"],
    benefits: [
      "Provides a surface for drinks and snacks",
      "Hidden storage for remote controls and magazines",
      "Complements most decor styles",
      "Space-efficient design for small apartments",
    ],
    specifications: {
      general: {
        Type: "Coffee Table with Storage",
        Material: "Engineered Wood",
        Color: "White/Oak",
        Style: "Modern",
      },
      dimensions: {
        Length: "100 cm",
        Width: "60 cm",
        Height: "45 cm",
        Weight: "18 kg",
      },
      features: {
        "Lift-Top": "Yes",
        "Storage Compartment": "Yes",
        "Assembly Required": "Yes",
        "Weight Capacity": "30 kg",
      },
    },
    reviewList: [
      {
        name: "Arjun P.",
        avatar: "/images/avatar-19.jpg",
        date: "1 month ago",
        rating: 4,
        rentalPeriod: "6 months",
        comment:
          "Great coffee table with useful storage. The lift-top feature is perfect when eating or working on the sofa.",
      },
      {
        name: "Neha S.",
        avatar: "/images/avatar-20.jpg",
        date: "2 months ago",
        rating: 5,
        rentalPeriod: "3 months",
        comment: "Stylish table that fits perfectly in my small living room. The storage space is a bonus.",
      },
    ],
    faqs: [
      {
        question: "How much weight can the lift-top support when raised?",
        answer: "The lift-top can support up to 10 kg when raised, which is sufficient for a laptop, books, or a meal.",
      },
      {
        question: "Is the surface scratch-resistant?",
        answer:
          "The table has a moderate scratch resistance. We recommend using coasters for drinks and avoiding placing sharp objects directly on the surface.",
      },
    ],
  },
  // BEDROOM ITEMS
  {
    id: 26,
    name: "Queen Size Bed",
    category: "bedroom",
    shortDescription: "Comfortable queen bed with storage",
    description:
      "This queen-size bed combines comfort with practicality, featuring built-in storage drawers underneath. Perfect for maximizing space in rented apartments and PG accommodations.",
    image: "/images/product-queensizebed.avif",
    priceDaily: 150,
    priceWeekly: 900,
    priceMonthly: 2500,
    rating: 4.8,
    reviews: 65,
    features: ["Under-bed Storage", "Sturdy Frame", "No Box Spring Required", "Modern Design"],
    benefits: [
      "Maximize bedroom space with under-bed storage",
      "Comfortable sleeping surface",
      "Eliminates need for additional storage furniture",
      "Easy to assemble and disassemble for moves",
    ],
    specifications: {
      general: {
        Size: 'Queen (60" x 80")',
        "Frame Material": "Engineered Wood",
        Color: "Walnut Brown",
        Style: "Modern",
      },
      dimensions: {
        Length: "210 cm",
        Width: "160 cm",
        Height: "40 cm (without headboard)",
        "Storage Drawer Height": "15 cm",
      },
      features: {
        "Number of Storage Drawers": "4",
        Headboard: "Optional",
        "Assembly Required": "Yes",
        "Weight Capacity": "300 kg",
      },
    },
    reviewList: [
      {
        name: "Rajesh K.",
        avatar: "/images/avatar-21.jpg",
        date: "2 months ago",
        rating: 5,
        rentalPeriod: "12 months",
        comment: "Excellent bed with useful storage drawers. The frame is sturdy and the mattress support is good.",
      },
      {
        name: "Ananya M.",
        avatar: "/images/avatar-22.jpg",
        date: "3 months ago",
        rating: 5,
        rentalPeriod: "6 months",
        comment:
          "The storage drawers are a game-changer in my small apartment. Assembly was straightforward with the provided instructions.",
      },
    ],
    faqs: [
      {
        question: "Does this include a mattress?",
        answer:
          "No, this is for the bed frame only. We do offer mattresses separately that you can add to your rental package.",
      },
      {
        question: "How much weight can each storage drawer hold?",
        answer:
          "Each storage drawer can safely hold up to 10 kg of items, making them perfect for storing clothing, bedding, or other lightweight items.",
      },
    ],
  },
  {
    id: 27,
    name: "Single Bed",
    category: "bedroom",
    shortDescription: "Space-saving single bed for small rooms",
    description:
      "This compact single bed is perfect for small bedrooms in PG accommodations or shared apartments. The sturdy frame provides good support while taking minimal floor space.",
    image: "/images/product-singlebed.jpg",
    priceDaily: 80,
    priceWeekly: 450,
    priceMonthly: 1300,
    rating: 4.5,
    reviews: 48,
    features: ["Space-Saving Design", "Sturdy Metal Frame", "No Box Spring Required", "Easy Assembly"],
    benefits: [
      "Perfect for small bedrooms or shared spaces",
      "Durable construction for long-term use",
      "Simple, versatile design fits most decor",
      "Easy to move when rearranging furniture",
    ],
    specifications: {
      general: {
        Size: 'Single (36" x 75")',
        "Frame Material": "Metal",
        Color: "Black",
        Style: "Minimalist",
      },
      dimensions: {
        Length: "190 cm",
        Width: "90 cm",
        Height: "35 cm (without headboard)",
        "Clearance Underneath": "25 cm",
      },
      features: {
        Headboard: "Yes",
        Footboard: "Yes",
        "Assembly Required": "Yes",
        "Weight Capacity": "150 kg",
      },
    },
    reviewList: [
      {
        name: "Varun T.",
        avatar: "/images/avatar-23.jpg",
        date: "1 month ago",
        rating: 4,
        rentalPeriod: "3 months",
        comment: "Sturdy bed that's perfect for my PG room. Easy to assemble and doesn't take up much space.",
      },
      {
        name: "Pooja R.",
        avatar: "/images/avatar-24.jpg",
        date: "2 months ago",
        rating: 5,
        rentalPeriod: "6 months",
        comment: "Great quality for the rental price. The frame is solid and doesn't make any noise.",
      },
    ],
    faqs: [
      {
        question: "Does this include a mattress?",
        answer:
          "No, this is for the bed frame only. We do offer single mattresses separately that you can add to your rental package.",
      },
      {
        question: "Can I store items underneath the bed?",
        answer:
          "Yes, there is approximately 25 cm of clearance underneath the bed, which is sufficient for storing flat containers or boxes.",
      },
    ],
  },
  {
    id: 28,
    name: "Wardrobe (2-Door)",
    category: "bedroom",
    shortDescription: "Compact wardrobe for clothing storage",
    description:
      "This 2-door wardrobe provides ample storage for clothing and accessories in a compact footprint. Perfect for bedrooms in rented apartments and PG accommodations.",
    image: "/images/product-wardrobe.webp",
    priceDaily: 100,
    priceWeekly: 600,
    priceMonthly: 1800,
    rating: 4.6,
    reviews: 52,
    features: ["2 Doors", "Hanging Rail", "Shelves", "Mirror on Door"],
    benefits: [
      "Organize clothing and accessories",
      "Maximize vertical storage space",
      "Built-in mirror saves space",
      "No need to drill holes in rental walls",
    ],
    specifications: {
      general: {
        Type: "2-Door Wardrobe",
        Material: "Engineered Wood",
        Color: "White",
        Style: "Modern",
      },
      dimensions: {
        Height: "180 cm",
        Width: "90 cm",
        Depth: "50 cm",
        Weight: "45 kg",
      },
      features: {
        "Number of Shelves": "3",
        "Hanging Rail": "Yes",
        Mirror: "Yes, on one door",
        "Assembly Required": "Yes",
      },
    },
    reviewList: [
      {
        name: "Karan S.",
        avatar: "/images/avatar-1.jpg",
        date: "2 months ago",
        rating: 5,
        rentalPeriod: "12 months",
        comment: "Perfect size for my small bedroom. The mirror on the door is a great space-saving feature.",
      },
      {
        name: "Divya P.",
        avatar: "/images/avatar-2.jpg",
        date: "1 month ago",
        rating: 4,
        rentalPeriod: "6 months",
        comment: "Good storage capacity for the size. Assembly was a bit tricky but the delivery team helped.",
      },
    ],
    faqs: [
      {
        question: "Can the shelves be adjusted?",
        answer: "Yes, the internal shelves can be adjusted to different heights to accommodate items of various sizes.",
      },
      {
        question: "Does it come with locks for the doors?",
        answer:
          "No, this wardrobe does not come with locks. If security is a concern, we recommend our lockable wardrobe options.",
      },
    ],
  },
  {
    id: 29,
    name: "Bedside Table",
    category: "bedroom",
    shortDescription: "Compact nightstand with drawer storage",
    description:
      "This compact bedside table features a drawer and open shelf for convenient bedside storage. Perfect for small bedrooms in rented apartments and PG accommodations.",
    image: "/images/product-besidetable.jpeg",
    priceDaily: 35,
    priceWeekly: 200,
    priceMonthly: 600,
    rating: 4.3,
    reviews: 47,
    features: ["Drawer Storage", "Open Shelf", "Compact Design", "Easy Assembly"],
    benefits: [
      "Keep essentials within reach while in bed",
      "Storage drawer for private items",
      "Open shelf for books and frequently used items",
      "Space-saving design for small rooms",
    ],
    specifications: {
      general: {
        Material: "Engineered Wood",
        Color: "Walnut Brown",
        Assembly: "Required (tools included)",
        "Weight Capacity": "15 kg",
      },
      storage: {
        "Drawer Dimensions": "25 x 30 x 10 cm",
        "Shelf Dimensions": "30 x 30 cm",
        "Drawer Slides": "Smooth Metal Runners",
      },
      dimensions: {
        Height: "50 cm",
        Width: "35 cm",
        Depth: "35 cm",
        Weight: "8 kg",
      },
    },
    reviewList: [
      {
        name: "Arun T.",
        avatar: "/images/avatar-19.jpg",
        date: "2 months ago",
        rating: 4,
        rentalPeriod: "6 months",
        comment: "Perfect size for my small PG room. Assembly was easy and it looks good.",
      },
      {
        name: "Kavita D.",
        avatar: "/images/avatar-20.jpg",
        date: "3 months ago",
        rating: 5,
        rentalPeriod: "12 months",
        comment: "The drawer is spacious enough for my medicines and personal items. Very sturdy construction.",
      },
    ],
    faqs: [
      {
        question: "Does it require assembly?",
        answer: "Yes, assembly is required but it's simple and all necessary tools and instructions are provided.",
      },
      {
        question: "Can it support a table lamp and alarm clock?",
        answer:
          "Yes, the top surface can easily support items like a table lamp, alarm clock, and other small items with a combined weight of up to 15 kg.",
      },
    ],
  },
  {
    id: 30,
    name: "Dresser with Mirror",
    category: "bedroom",
    shortDescription: "Compact dresser with mirror for small bedrooms",
    description:
      "This space-efficient dresser with attached mirror provides both storage and a vanity area for your bedroom. Perfect for small apartments and PG accommodations.",
    image: "/images/product-dressermirror.avif",
    priceDaily: 90,
    priceWeekly: 500,
    priceMonthly: 1500,
    rating: 4.4,
    reviews: 38,
    features: ["3 Drawers", "Attached Mirror", "Compact Design", "Sturdy Construction"],
    benefits: [
      "Organize clothing and accessories",
      "Built-in mirror for getting ready",
      "Space-efficient design for small bedrooms",
      "Multiple drawers for organized storage",
    ],
    specifications: {
      general: {
        Type: "Dresser with Mirror",
        Material: "Engineered Wood",
        Color: "White",
        Style: "Modern",
      },
      dimensions: {
        Height: "140 cm (with mirror)",
        Width: "80 cm",
        Depth: "40 cm",
        "Mirror Size": "60 x 40 cm",
      },
      features: {
        "Number of Drawers": "3",
        "Drawer Slides": "Smooth Metal Runners",
        "Assembly Required": "Yes",
        "Weight Capacity": "30 kg",
      },
    },
    reviewList: [
      {
        name: "Nisha R.",
        avatar: "/images/avatar-3.jpg",
        date: "1 month ago",
        rating: 4,
        rentalPeriod: "6 months",
        comment: "Great dresser for my small bedroom. The mirror is a good size and the drawers are spacious.",
      },
      {
        name: "Suresh K.",
        avatar: "/images/avatar-4.jpg",
        date: "2 months ago",
        rating: 5,
        rentalPeriod: "3 months",
        comment: "Well-built dresser that looks more expensive than the rental price would suggest.",
      },
    ],
    faqs: [
      {
        question: "Can the mirror be removed if needed?",
        answer:
          "Yes, the mirror can be detached from the dresser if needed, though we recommend keeping it attached for stability.",
      },
      {
        question: "How deep are the drawers?",
        answer: "The drawers are approximately 15 cm deep, providing ample space for clothing and accessories.",
      },
    ],
  },
]

// Define featured products with only products that exist in the array
export const featuredProducts = [
  products[0], // TV
  products[1], // Refrigerator
  products[21], // 3-Seater Sofa
  products[26], // Queen Size Bed
  products[2], // Washing Machine
  products[22], // Dining Table
  products[28], // Wardrobe
  products[4], // Induction Cooktop
]
