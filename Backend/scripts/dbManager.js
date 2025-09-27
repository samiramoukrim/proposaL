const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Service = require('../models/Service');

class DatabaseManager {
  constructor() {
    this.isConnected = false;
  }

  async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      this.isConnected = true;
      console.log('✅ Connected to MongoDB Atlas');
      console.log(`📍 Database: ${mongoose.connection.name}`);
      console.log(`🔗 Host: ${mongoose.connection.host}`);
      return true;
    } catch (error) {
      console.error('❌ MongoDB connection error:', error.message);
      return false;
    }
  }

  async disconnect() {
    if (this.isConnected) {
      await mongoose.connection.close();
      this.isConnected = false;
      console.log('📡 Disconnected from MongoDB');
    }
  }

  // Database Statistics
  async getStats() {
    try {
      const userCount = await User.countDocuments();
      const serviceCount = await Service.countDocuments();
      const activeServices = await Service.countDocuments({ isActive: true });
      
      console.log('\n📊 DATABASE STATISTICS');
      console.log('========================');
      console.log(`👥 Total Users: ${userCount}`);
      console.log(`🛠️  Total Services: ${serviceCount}`);
      console.log(`✅ Active Services: ${activeServices}`);
      console.log(`❌ Inactive Services: ${serviceCount - activeServices}`);
      
      return {
        users: userCount,
        services: serviceCount,
        activeServices,
        inactiveServices: serviceCount - activeServices
      };
    } catch (error) {
      console.error('❌ Error getting stats:', error.message);
    }
  }

  // List all users
  async listUsers() {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      console.log('\n👥 ALL USERS');
      console.log('=============');
      if (users.length === 0) {
        console.log('No users found');
        return [];
      }
      
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} (${user.email}) - Age: ${user.age || 'N/A'}`);
        console.log(`   ID: ${user._id}`);
        console.log(`   Created: ${user.createdAt?.toLocaleDateString() || 'N/A'}`);
        console.log('');
      });
      
      return users;
    } catch (error) {
      console.error('❌ Error listing users:', error.message);
    }
  }

  // List all services
  async listServices() {
    try {
      const services = await Service.find().sort({ createdAt: -1 });
      console.log('\n🛠️  ALL SERVICES');
      console.log('================');
      if (services.length === 0) {
        console.log('No services found');
        return [];
      }
      
      services.forEach((service, index) => {
        const status = service.isActive ? '✅' : '❌';
        const price = service.price ? `$${service.price}` : 'Free';
        console.log(`${index + 1}. ${status} ${service.title} - ${price}`);
        console.log(`   Category: ${service.category}`);
        console.log(`   ID: ${service._id}`);
        console.log(`   Created: ${service.createdAt?.toLocaleDateString() || 'N/A'}`);
        if (service.description) {
          console.log(`   Description: ${service.description.substring(0, 100)}...`);
        }
        console.log('');
      });
      
      return services;
    } catch (error) {
      console.error('❌ Error listing services:', error.message);
    }
  }

  // Clear all data
  async clearAllData() {
    try {
      const userResult = await User.deleteMany({});
      const serviceResult = await Service.deleteMany({});
      
      console.log('\n🗑️  DATA CLEARED');
      console.log('================');
      console.log(`👥 Deleted ${userResult.deletedCount} users`);
      console.log(`🛠️  Deleted ${serviceResult.deletedCount} services`);
      
      return {
        usersDeleted: userResult.deletedCount,
        servicesDeleted: serviceResult.deletedCount
      };
    } catch (error) {
      console.error('❌ Error clearing data:', error.message);
    }
  }

  // Seed sample data
  async seedSampleData() {
    try {
      // Sample users
      const sampleUsers = [
        { name: 'Samira Moukrim', email: 'samira@example.com', age: 28 },
        { name: 'Ahmed Hassan', email: 'ahmed@example.com', age: 32 },
        { name: 'Fatima Zahra', email: 'fatima@example.com', age: 25 },
        { name: 'Youssef Alami', email: 'youssef@example.com', age: 30 },
        { name: 'Aicha Benali', email: 'aicha@example.com', age: 27 }
      ];

      // Sample services
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

      const createdUsers = await User.insertMany(sampleUsers);
      const createdServices = await Service.insertMany(sampleServices);

      console.log('\n🌱 SAMPLE DATA SEEDED');
      console.log('=====================');
      console.log(`👥 Created ${createdUsers.length} users`);
      console.log(`🛠️  Created ${createdServices.length} services`);

      return {
        usersCreated: createdUsers.length,
        servicesCreated: createdServices.length
      };
    } catch (error) {
      console.error('❌ Error seeding data:', error.message);
    }
  }

  // Database health check
  async healthCheck() {
    try {
      const dbState = mongoose.connection.readyState;
      const states = {
        0: 'Disconnected',
        1: 'Connected',
        2: 'Connecting',
        3: 'Disconnecting'
      };

      console.log('\n🏥 DATABASE HEALTH CHECK');
      console.log('========================');
      console.log(`Status: ${states[dbState]} (${dbState})`);
      console.log(`Database: ${mongoose.connection.name || 'Unknown'}`);
      console.log(`Host: ${mongoose.connection.host || 'Unknown'}`);
      console.log(`Port: ${mongoose.connection.port || 'Unknown'}`);

      if (dbState === 1) {
        // Test with a simple query
        const testResult = await User.findOne().limit(1);
        console.log('✅ Database query test: SUCCESS');
      }

      return {
        state: dbState,
        status: states[dbState],
        database: mongoose.connection.name,
        host: mongoose.connection.host
      };
    } catch (error) {
      console.error('❌ Health check failed:', error.message);
    }
  }

  // Export data to JSON
  async exportData() {
    try {
      const users = await User.find();
      const services = await Service.find();

      const exportData = {
        exportDate: new Date().toISOString(),
        users: users,
        services: services,
        counts: {
          users: users.length,
          services: services.length
        }
      };

      const fs = require('fs');
      const filename = `database_export_${new Date().toISOString().split('T')[0]}.json`;
      fs.writeFileSync(filename, JSON.stringify(exportData, null, 2));

      console.log('\n💾 DATA EXPORTED');
      console.log('================');
      console.log(`File: ${filename}`);
      console.log(`👥 Users: ${users.length}`);
      console.log(`🛠️  Services: ${services.length}`);

      return filename;
    } catch (error) {
      console.error('❌ Error exporting data:', error.message);
    }
  }
}

// CLI Interface
async function main() {
  const dbManager = new DatabaseManager();
  const args = process.argv.slice(2);
  const command = args[0];

  if (!await dbManager.connect()) {
    process.exit(1);
  }

  try {
    switch (command) {
      case 'stats':
        await dbManager.getStats();
        break;
      case 'users':
        await dbManager.listUsers();
        break;
      case 'services':
        await dbManager.listServices();
        break;
      case 'clear':
        await dbManager.clearAllData();
        break;
      case 'seed':
        await dbManager.seedSampleData();
        break;
      case 'health':
        await dbManager.healthCheck();
        break;
      case 'export':
        await dbManager.exportData();
        break;
      case 'full':
        await dbManager.healthCheck();
        await dbManager.getStats();
        await dbManager.listUsers();
        await dbManager.listServices();
        break;
      default:
        console.log('\n🛠️  DATABASE MANAGER');
        console.log('===================');
        console.log('Available commands:');
        console.log('  stats    - Show database statistics');
        console.log('  users    - List all users');
        console.log('  services - List all services');
        console.log('  clear    - Clear all data');
        console.log('  seed     - Add sample data');
        console.log('  health   - Database health check');
        console.log('  export   - Export data to JSON');
        console.log('  full     - Show everything');
        console.log('\nUsage: node scripts/dbManager.js <command>');
    }
  } catch (error) {
    console.error('❌ Command failed:', error.message);
  } finally {
    await dbManager.disconnect();
    process.exit(0);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = DatabaseManager;
