const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

const MONGO_URI = 'mongodb+srv://user_0002:user12345@dmkcluster.k60wxg4.mongodb.net/dmk-db?appName=DmkCluster';
const DB_NAME = 'dmk-db';
const COLLECTION = 'cam_postal_code';

// 🔹 Set EJS
app.set('views', 'src/view');
app.set('view engine', 'ejs');

// 🔹 Mongo Client
const client = new MongoClient(MONGO_URI);

async function getProvinces() {
  await client.connect();
  const db = client.db('dmk-db');
  return db.collection('cam_postal_code').find({}).toArray();
}

// 🔹 Route
app.get('/', async (req, res) => {
  try {
    const provinces = await getProvinces();
    res.render('index', { provinces });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 🔹 Start Server
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
