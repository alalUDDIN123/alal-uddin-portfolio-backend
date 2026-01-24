const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected`);
    return conn;
  } catch (error) {
    console.warn(`❌ MongoDB Connection Error: ${error.message}`);
    return null;
  }
};

module.exports = connectDB;
