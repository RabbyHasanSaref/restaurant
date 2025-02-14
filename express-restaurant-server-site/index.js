const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')('sk_test_51PKlhmHrFO30QHPCUUXucTvFAVb0AsasvCML2InpsFjdin1GaavnPNpmNn6hjtZoUdqbAsQR6vQXU0GMyyqXNr3900IttfxBjL');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3x1kphs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

        const usercollaction = client.db('express_restaurant').collection('user');
        const menucollaction = client.db('express_restaurant').collection('menu');
        const reviewcollaction = client.db('express_restaurant').collection('review');
        const cartcollaction = client.db('express_restaurant').collection('cart');
        const paymentcollaction = client.db('express_restaurant').collection('payment');

        // jwt related 
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.send({ token });
        })
        // middleware 
        const verifyToken = (req, res, next) => {
            // console.log('inside token verify', req.headers.authorization);
            if (!req.headers.authorization) {
                return res.status(401).send({ message: 'forbidden access' })
            }
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: 'forbidden access' });
                }
                req.decoded = decoded;
                next();
            })
        }

        // use verify admin after verifyToken
        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await usercollaction.findOne(query);
            const isAdmin = user?.role === 'admin';
            if (!isAdmin) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            next();
        }



        // user collaction 
        app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
            const result = await usercollaction.find().toArray();
            res.send(result);
        })

        app.get('/users/admin/:email', verifyToken, async (req, res) => {
            const email = req.params.email;

            if (email !== req.decoded.email) {
                return res.status(403).send({ message: 'forbidden access' })
            }

            const query = { email: email };
            const user = await usercollaction.findOne(query);
            let admin = false;
            if (user) {
                admin = user?.role === 'admin';
            }
            res.send({ admin });
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const query = { email: user.email }
            const existingUser = await usercollaction.findOne(query);
            if (existingUser) {
                return res.send({ message: 'already user sxisting', insertedId: null })
            }
            const result = await usercollaction.insertOne(user);
            res.send(result);
        })

        app.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {
                    role: 'admin'
                }
            }
            const result = await usercollaction.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await usercollaction.deleteOne(query);
            res.send(result);
        })

        // menu collaction 
        app.get('/menu', async (req, res) => {
            const result = await menucollaction.find().toArray();
            res.send(result);
        })

        app.get('/menu/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await menucollaction.findOne(query);
            res.send(result);
        })

        app.post('/menu', verifyToken, verifyAdmin, async (req, res) => {
            const menuItem = req.body;
            const result = await menucollaction.insertOne(menuItem);
            res.send(result);
        })

        app.patch('/menu/:id', async (req, res) => {
            const item = req.body;
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {
                    name: item.name,
                    recipe: item.recipe,
                    category: item.category,
                    price: item.price,
                    image: item.image,
                }
            }
            const result = await menucollaction.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.delete('/menu/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await menucollaction.deleteOne(query);
            res.send(result);
        })

        // review collaction 
        app.get('/review', async (req, res) => {
            const result = await reviewcollaction.find().toArray();
            res.send(result);
        })

        // cart collaction
        app.get('/carts', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const result = await cartcollaction.find(query).toArray()
            res.send(result)
        })

        app.post('/carts', async (req, res) => {
            const cartItme = req.body;
            const result = await cartcollaction.insertOne(cartItme);
            res.send(result);
        })

        app.delete('/carts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await cartcollaction.deleteOne(query);
            res.send(result);
        })

        // payment Intent
        app.post('/create-payment-intent', async (req, res) => {
            const { price } = req.body;
            const amount = parseInt(price * 100);
            console.log(amount, 'amount inside');

            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: "usd",
                payment_method_types: ["card"]
            })

            res.send({
                clientSecret: paymentIntent.client_secret,
            })
        })

        // ------------------ 
        app.get('/payments/:email', verifyToken, async (req, res) => {
            const query = { email: req.params.email }

            if (req.params.email !== req.decoded.email) {
                return res.status(403).send({ message: 'unauthrize' });
            }

            const result = await paymentcollaction.find(query).toArray();
            res.send(result);
        })

        app.post('/payments', async (req, res) => {
            const payment = req.body;
            const paymentResult = await paymentcollaction.insertOne(payment);
            // console.log(payment)

            // cearefuly cart item delete 
            const query = {
                _id: {
                    $in: payment.cartIds.map(id => new ObjectId(id))
                }
            }
            const deleteResult = await cartcollaction.deleteMany(query);
            res.send({ paymentResult, deleteResult })
        })

        // admin stats 
        app.get('/admin-stats', async (req, res) => {
            const users = await usercollaction.estimatedDocumentCount();
            const menuItems = await menucollaction.estimatedDocumentCount();
            const orders = await paymentcollaction.estimatedDocumentCount();

            // revenue not waye 
            // const payments = await paymentcollaction.find().toArray();
            // const revenue = payments.reduce((total, payment) => total + payment.price, 0)

            // revenue best waye 
            const result = await paymentcollaction.aggregate([
                {
                    $group: {
                        _id: null,
                        totalRevenue: {
                            $sum: '$price'
                        }
                    }
                }
            ]).toArray();
            const revenue = result.length > 0 ? result[0].totalRevenue : 0;

            res.send({
                users,
                menuItems,
                orders,
                revenue
            })
        })

        app.get('/order-stats', verifyToken, verifyAdmin, async (req, res) => {
            const result = await paymentcollaction.aggregate([
                {
                    $unwind: '$menuIds'
                },

                {
                    $lookup: {
                        from: 'menu',
                        localField: 'menuIds',
                        foreignField: '_id',
                        as: 'menuId'
                    }
                },

                {
                    $unwind: '$menuId'
                },

                {
                    $group: {
                        _id: '$menuId.category',
                        quantity: { $sum: 1 },
                        revenue: { $sum: '$menuId.price' }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        category: '$_id',
                        quantity: '$quantity',
                        revenue: '$revenue',
                    }
                }

            ]).toArray();

            res.send(result);
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


app.get('/', (req, res) => {
    res.send('express-restaurant-server-site on')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})