require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

const client = new MongoClient(process.env.MONGO_URI, {
  tls: true,
  family: 4,
  serverSelectionTimeoutMS: 5000,
});

let collection;

(async () => {
  try {
    await client.connect();
    const db = client.db('dmk-db');
    collection = db.collection('cam_postal_code');
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
})();

app.get('/', async (req, res) => {
  const data = await collection.find({}).toArray();
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));