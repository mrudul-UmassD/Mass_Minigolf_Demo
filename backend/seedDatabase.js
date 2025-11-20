const mongoose = require('mongoose');
require('dotenv').config();
const GolfCourse = require('./models/GolfCourse');

// Sample Massachusetts Mini Golf Courses Data
const golfCourses = [
  {
    name: "Pirate's Cove Adventure Golf - South Yarmouth",
    description: "A pirate-themed mini golf adventure featuring waterfalls, caves, and lush tropical landscaping. Two 18-hole courses available.",
    website: "https://piratescove.net",
    menuLink: "",
    googleMapsLink: "https://maps.google.com/?q=Pirate's+Cove+South+Yarmouth+MA",
    address: "728 Main Street (Route 28)",
    city: "South Yarmouth, MA",
    phone: "(508) 394-6200",
    photos: [
      "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800",
      "https://images.unsplash.com/photo-1593642532400-2682810df593?w=800"
    ],
    features: ["Pirate Theme", "Waterfalls", "Caves", "Two 18-hole Courses", "Family Friendly"]
  },
  {
    name: "Castle Island Mini Golf",
    description: "Located near Castle Island in South Boston, featuring castle-themed obstacles and harbor views.",
    website: "",
    menuLink: "",
    googleMapsLink: "https://maps.google.com/?q=Castle+Island+South+Boston+MA",
    address: "Castle Island, Day Boulevard",
    city: "South Boston, MA",
    phone: "",
    photos: [
      "https://images.unsplash.com/photo-1622819584099-e04ccb14e8a7?w=800"
    ],
    features: ["Castle Theme", "Harbor Views", "Outdoor Course"]
  },
  {
    name: "Kimball Farm Mini Golf - Westford",
    description: "A classic New England mini golf experience with challenging holes, ice cream stand, and farm animals nearby.",
    website: "https://www.kimballfarm.com",
    menuLink: "https://www.kimballfarm.com/ice-cream-menu",
    googleMapsLink: "https://maps.google.com/?q=Kimball+Farm+Westford+MA",
    address: "400 Littleton Road",
    city: "Westford, MA",
    phone: "(978) 486-3891",
    photos: [
      "https://images.unsplash.com/photo-1562184552-d8c473896983?w=800"
    ],
    features: ["Ice Cream", "Farm Animals", "Classic Design", "Family Owned"]
  },
  {
    name: "Skull Island Sports World",
    description: "Indoor/outdoor sports complex with a challenging pirate-themed mini golf course, batting cages, and arcade.",
    website: "https://www.skullislandsports.com",
    menuLink: "",
    googleMapsLink: "https://maps.google.com/?q=Skull+Island+Sports+World+Abington+MA",
    address: "355 Adams Street",
    city: "Abington, MA",
    phone: "(781) 982-7441",
    photos: [
      "https://images.unsplash.com/photo-1625012240037-f8b418c49db4?w=800"
    ],
    features: ["Indoor/Outdoor", "Pirate Theme", "Arcade", "Batting Cages", "Year Round"]
  },
  {
    name: "Cape Cod Inflatable Park - West Yarmouth",
    description: "Features an 18-hole mini golf course alongside massive inflatable attractions and activities for all ages.",
    website: "https://www.capecodinflatablepark.com",
    menuLink: "",
    googleMapsLink: "https://maps.google.com/?q=Cape+Cod+Inflatable+Park+West+Yarmouth+MA",
    address: "518 Route 28",
    city: "West Yarmouth, MA",
    phone: "(508) 534-9900",
    photos: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
    ],
    features: ["Inflatable Attractions", "Mini Golf", "Family Entertainment", "Multiple Activities"]
  },
  {
    name: "Adventure Miniature Golf - Sandwich",
    description: "A beautifully landscaped course with water features, bridges, and tropical plants creating a vacation atmosphere.",
    website: "",
    menuLink: "",
    googleMapsLink: "https://maps.google.com/?q=Adventure+Miniature+Golf+Sandwich+MA",
    address: "18 Tupper Road",
    city: "Sandwich, MA",
    phone: "(508) 833-8785",
    photos: [
      "https://images.unsplash.com/photo-1592656094267-764a45160876?w=800"
    ],
    features: ["Water Features", "Tropical Landscaping", "Bridges", "Challenging Holes"]
  },
  {
    name: "Grand Prix Mini Golf - Hyannis",
    description: "Part of the Grand Prix entertainment complex offering mini golf alongside go-karts and other attractions.",
    website: "https://www.capecodgrandprix.com",
    menuLink: "",
    googleMapsLink: "https://maps.google.com/?q=Grand+Prix+Hyannis+MA",
    address: "111 Bearse's Way",
    city: "Hyannis, MA",
    phone: "(508) 778-4499",
    photos: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800"
    ],
    features: ["Go-Karts Nearby", "Entertainment Complex", "Multiple Attractions"]
  },
  {
    name: "Xtreme Craze - Northborough",
    description: "Indoor entertainment center featuring glow-in-the-dark mini golf, laser tag, arcade, and more.",
    website: "https://www.xtremecraze.com",
    menuLink: "https://www.xtremecraze.com/cafe",
    googleMapsLink: "https://maps.google.com/?q=Xtreme+Craze+Northborough+MA",
    address: "151 Southwest Cutoff",
    city: "Northborough, MA",
    phone: "(508) 393-3450",
    photos: [
      "https://images.unsplash.com/photo-1612464904133-6817b7e0f7c7?w=800"
    ],
    features: ["Glow-in-the-Dark", "Indoor", "Laser Tag", "Arcade", "Climate Controlled"]
  },
  {
    name: "Fun and Games Family Entertainment - Bourne",
    description: "Family entertainment center with arcade games, bumper boats, and an outdoor mini golf course.",
    website: "",
    menuLink: "",
    googleMapsLink: "https://maps.google.com/?q=Fun+and+Games+Bourne+MA",
    address: "7 MacArthur Boulevard",
    city: "Bourne, MA",
    phone: "(508) 759-2636",
    photos: [
      "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800"
    ],
    features: ["Arcade", "Bumper Boats", "Outdoor Course", "Family Activities"]
  },
  {
    name: "Beaches Mini Golf - Salisbury",
    description: "Beach-themed miniature golf course near Salisbury Beach with ocean views and seaside atmosphere.",
    website: "",
    menuLink: "",
    googleMapsLink: "https://maps.google.com/?q=Salisbury+Beach+Mini+Golf+MA",
    address: "9 Beach Road",
    city: "Salisbury, MA",
    phone: "",
    photos: [
      "https://images.unsplash.com/photo-1562619227-92b15d67059f?w=800"
    ],
    features: ["Beach Theme", "Ocean Views", "Seaside Location", "Summer Fun"]
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/massachusetts_minigolf');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await GolfCourse.deleteMany({});
    console.log('🗑️  Cleared existing golf courses');

    // Insert new data
    await GolfCourse.insertMany(golfCourses);
    console.log(`✅ Successfully added ${golfCourses.length} golf courses to the database`);

    // Close connection
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
