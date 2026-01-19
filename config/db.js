const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected`);
    return conn;
  } catch (error) {
    console.warn(`⚠️  MongoDB not available - Server running in limited mode`);
    return null;
  }
};

module.exports = connectDB;
