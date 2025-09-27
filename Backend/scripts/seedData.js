const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Service = require('../models/Service');

// Sample data
const sampleUsers = [
  {
    name: 'Samira Moukrim',
    email: 'samira@example.com',
    age: 28
  },
  {
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    age: 32
  },
  {
    name: 'Fatima Zahra',
    email: 'fatima@example.com',
    age: 25
  }
];

const sampleServices = [
  {
    title: 'Marriage Proposal Planning',
    description: 'We craft personalized proposal experiences with attention to every detail, ensuring your moment is unforgettable.',
    price: 1500,
    category: 'Marriage Proposal Planning'
  },
  {
    title: 'Anniversary & Date Night',
    description: 'From intimate dinners to stylish anniversary setups, we create memorable and elegant experiences.',
    price: 800,
    category: 'Anniversary & Date Night'
  },
  {
    title: 'Event Rentals',
    description: 'Hand-picked furniture and décor to elevate your event effortlessly, keeping it minimal and chic.',
    price: 500,
    category: 'Event Rentals'
  },
  {
    title: 'Shop the Edit',
    description: 'Select premium props and setups curated for creating modern, stylish DIY moments.',
    price: 300,
    category: 'Shop the Edit'
  },
  {
    title: 'Elopement & Micro-Wedding Planning',
    description: 'From styled to custom wedding and elopement designs, our highly skilled team will bring your wedding dreams to life!',
    price: 2500,
    category: 'Marriage Proposal Planning'
  },
  {
    title: 'Proposal Photography',
    description: 'Capture every magical moment of your proposal with professional photography, preserving memories forever.',
    price: 600,
    category: 'Event Rentals'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Service.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Insert sample users
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`👥 Created ${createdUsers.length} users`);

    // Insert sample services
    const createdServices = await Service.insertMany(sampleServices);
    console.log(`🛠️ Created ${createdServices.length} services`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nCreated Users:');
    createdUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email})`);
    });

    console.log('\nCreated Services:');
    createdServices.forEach(service => {
      console.log(`- ${service.title} - $${service.price}`);
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n📡 Database connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();
