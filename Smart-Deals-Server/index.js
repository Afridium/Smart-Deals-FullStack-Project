const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();

//Firebase ADMIN
var admin = require("firebase-admin");

var serviceAccount = require("./smart-deals-project-b8ae4-firebase-adminsdk-fbsvc-c7ee654a70.json");
const { getAuth } = require('firebase-admin/auth');

admin.initializeApp({
  credential: admin.cert(serviceAccount)
});

//middlewares
app.use(cors());
app.use(express.json());
const logger = (req, res, next) => {
  next();
}
const verifyFireBaseToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Unauthorized Access, Access Denied!" });
  }
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: "Token Not Found, Access Denied!" });
  }
  try {
    const userInfo = await getAuth().verifyIdToken(token);
    //req.decoded = userInfo; // see below
    req.token_email = userInfo.email;
    next();
  } catch (err) {
    console.error(err); // see below
    return res.status(401).send({ message: "Unauthorized Access!" });
  }
};

const verifyJWTToken = (req, res, next) => {
  const authToken = req.headers.authorization;
  if(!authToken){
    return res.status(401).send({message: "Unauthorized Access Detected, Calling the FBI CIA KGB"})
  }
  const token = authToken.split(' ')[1];
  if(!token){
    return res.status(401).send({message: "Woah! Woah! Woah! Buddy hold on there, Unauthorized!"});
  }

  next();
}
const uri = `mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPASS}@cluster0.ge664mc.mongodb.net/?appName=Cluster0`;

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
    await client.connect();

    const db = client.db('smart_deals_db');
    const productCollection = db.collection('products');
    const bidsCollection = db.collection('bids');
    const usersCollection = db.collection('users');
    console.log(process.env.JWTSECRETKEY)
    //JWT related API
    app.post('/getToken', (req, res) => {
      const loggedUser = req.body;
      const jwt = require('jsonwebtoken');
      const token = jwt.sign(loggedUser, process.env.JWTSECRETKEY, {expiresIn: '1h'});
      res.send({token: token});
    })
    //Product Related API
    app.get('/products', async (req, res) => {
      const email = req.query.mail;
      const query = {};
      if (email) {
       
        query.email = email;
      }
      const cursor = productCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/latest-products', async (req, res) => {
      const cursor = productCollection.find().sort({ created_at: -1 }).limit(6);
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/products/:id', async (req, res) => {
      const stringId = req.params.id;

      const query = ObjectId.isValid(stringId)
        ? { $or: [{ _id: new ObjectId(stringId) }, { _id: stringId }] }
        : { _id: stringId };

      const result = await productCollection.findOne(query);
      res.send(result);
    });

    app.post('/products', async (req, res) => {
      const newProduct = req.body;
      const result = await productCollection.insertOne(newProduct);
      res.send(result);
    })

    app.delete('/products/:id', async (req, res) => {
      const stringId = req.params.id;
      const query = { _id: new ObjectId(stringId) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    })

    app.patch('/products/:id', async (req, res) => {
      const stringId = req.params.id;
      const updatedProcudt = req.body;
      const query = { _id: new ObjectId(stringId) };
      const updateDoc = {
        $set: updatedProcudt
      }
      const result = await productCollection.updateOne(query, updateDoc);
      res.send(result);
    })

    //bids related API

    //bids with jwt token verify
    app.get('/bids', verifyJWTToken, async(req,res)=>{
      // console.log(req.headers.authorization);
      const email = req.query.email;
      const query = {};
      if(email){
        query.buyer_email = email;
      }
      const cursor = bidsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })

    //bids with firebase token verify
    // app.get('/bids', logger, verifyFireBaseToken, async (req, res) => {
      
    //   const email = req.query.mail;
    //   const query = {};
    //   if (email) {
    //     if(email != req.token_email){
    //       return res.status(403).send({messsage: "Forbidden Access Detected! Shoo Shoo"});
    //     }
    //     query.buyer_email = email;
    //   }
    //   const cursor = bidsCollection.find(query);
    //   const result = await cursor.toArray();
    //   res.send(result);
    // })

    app.get('/products/bids/:id', async (req, res) => {
      const stringID = req.params.id;
      const query = { product: stringID }
      const result = await bidsCollection.find(query).sort({bid_price: -1}).toArray();
      res.send(result);
    })
    app.post('/bids', async (req, res) => {
      const bids = req.body;
      const result = await bidsCollection.insertOne(bids);
      res.send(result);
    })
    app.delete('/bids/:id', async (req, res) => {
      const stringID = req.params.id;
      const query = { _id: new ObjectId(stringID) };
      const result = await bidsCollection.deleteOne(query);
      res.send(result);
    })
    app.patch('/bids/:id', async (req, res) => {
      const stringID = req.params.id;
      const query = { _id: new ObjectId(stringID) };
      const doc = req.body;
      const updateDoc = {
        $set: doc
      }
      const result = await bidsCollection.updateOne(query, updateDoc);
      res.send(result);
    })

    //Users related API

    app.post('/users', async (req, res) => {
      const newUser = req.body; //{ userEmail: user.userEmail }
      const existingUser = await usersCollection.findOne({ userEmail: newUser.userEmail });
      if (existingUser) {
        return res.send({ message: 'User already exists', inserted: false });
      }
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    })

    app.get('/users', async (req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/users/:id', async (req, res) => {
      const stringID = req.params.id;
      const query = { _id: new ObjectId(stringID) };
      const result = await usersCollection.findOne(query);
      res.send(result);
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Server Working');
})

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
})

