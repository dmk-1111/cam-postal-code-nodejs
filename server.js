const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

// 🔐 Use Environment Variable (IMPORTANT)
const MONGO_URI = process.env.MONGO_URI;

const DB_NAME = 'dmk-db';
const COLLECTION = 'cam_postal_code';

// 🔹 Set EJS
app.set('views', 'src/view');
app.set('view engine', 'ejs');

// 🔹 Mongo Client (TLS handled automatically)
const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let collection;

// 🔹 Connect ONCE
async function connectDB() {
  await client.connect();
  const db = client.db('dmk-db');
  collection = db.collection('cam_postal_code');
  console.log('✅ MongoDB Connected');
}

connectDB().catch(console.error);

// 🔹 Route
app.get('/', async (req, res) => {
  try {
    const provinces = await collection.find({}).toArray();
    res.render('index', { provinces });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database Error');
  }
});

// 🔹 Render uses PORT env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
