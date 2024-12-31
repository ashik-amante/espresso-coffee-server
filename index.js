const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

// middlewire
app.use(cors())
app.use(express.json())

// espressoKing
// DghnTuEM4io4tJTL


console.log(process.env.coffee_user);
console.log(process.env.coffee_pass);


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.coffee_user}:${process.env.coffee_pass}@cluster0.pdx5h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const coffeeCollection = client.db('espressoDB').collection('espresso');

    // add a coffee
    app.post('/coffees', async(req,res)=>{
        const coffee = req.body;
        console.log(coffee);
        const result = await coffeeCollection.insertOne(coffee)
        res.send(result)
    })
    // get coffee data
    app.get('/coffees',async(req,res)=>{
        const cursor = coffeeCollection.find();
        const result = await cursor.toArray()
        res.send(result)
    })
    // get single coffee details
    app.get('/coffees/:id', async(req,res)=>{
      const id = req.params.id;
      const quary = {_id: new ObjectId(id)}
      const result = await coffeeCollection.findOne(quary)
      res.send(result)
    })
    // search coffees based on email
    app.get('/coffees/email/:email',async(req,res)=>{
      console.log(req.params.email);
      const result = await coffeeCollection.find({email: req.params.email}).toArray()
      res.send(result)
    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => [
    res.send('coffee server is running')
])
app.listen(port, () => {
    console.log('port is working on', port);
})