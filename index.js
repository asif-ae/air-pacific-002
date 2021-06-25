// Main (required)
const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

// dotENV (required)
const port = process.env.PORT || 5555;
const name = process.env.MN_NAME;
const pass = process.env.MN_PASS;
const dbName = process.env.DB_NAME;
const tbCOLL = process.env.TB_COLL;
// const reCollection = process.env.DB_RECO;
// const odCollection = process.env.DB_ODCO;
// const adCollection = process.env.DB_ADCO;

// Most important
app.use(cors())
app.use(bodyParser.json())

// Database URI
const uri = `mongodb+srv://${name}:${pass}@cluster0.lq9rh.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  // Get Error
  console.log('Connection error:', err);

  // Access to TB Collection
  const tbCollection = client.db(dbName).collection(tbCOLL);
  console.log(`Database Connected Successfully! The port is ${port}`);

  // Add Service API
  app.post('/addticket', (req, res) => {
    const newBook = req.body;
    console.log('adding new Service', newBook);
    tbCollection.insertOne(newBook)
    .then(result => {
      console.log('inserted count:', result.insertedCount);
      res.send(result.insertedCount > 0)
    })
  })
  
  
  
  
  
  app.get('/', (req, res) => {
    res.send('Hello, Viewers! This URL from localhost is available now!')
  })
  // client.close();
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})