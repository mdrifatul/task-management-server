const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000 


// middleware
app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.80a5m0b.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const taskcollection =  client.db('TaskManagement').collection('task')

    app.post('/addtask', async(req,res) =>{
      const item = req.body;
      const result = await taskcollection.insertOne(item)
      res.send(result)
    })

    app.get('/gettask', async(req, res)=>{
      const result = await taskcollection.find().toArray()
      res.send(result)
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);

app.get('/', async(req, res)=>{
  res.send('task serve in running')
})
app.listen(port, () =>{
  console.log(`task server in running on port : ${port}`);
})