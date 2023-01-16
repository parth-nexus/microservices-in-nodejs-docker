const express = require("express");
const app = express();
require("dotenv").config();
let amqp = require("amqplib");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://adminXpd:0vkiuMYf8yHNR1lV@cluster0.y2sesuf.mongodb.net";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function dbconn() {
  const dbconn = await client.connect();
  const DBconnection = dbconn.db("cart");
  global.DBconnection = DBconnection;
}
dbconn();

app.get("/cart", async (req, res) => {
  const cart = await global.DBconnection.collection("items").find().toArray();
  res.json(cart);
});

app.post("/add-to-cart", async (req, res) => {
  const { name, desc, price } = req.body;

  try {
    await global.DBconnection.collection("items").insertOne({
      name,
      desc,
      price: parseFloat(price),
    });

    res.status(200).json({ message: "itme added" });

    /**
     * create queue and send message to that queue so that consumers of that queue can
     * process
     *
     */
    const queue = "tasks";
    const conn = await amqp.connect("amqp://localhost");
    const ch1 = await conn.createChannel();
    await ch1.assertQueue(queue);
    ch1.sendToQueue(queue, Buffer.from(JSON.stringify({ name, desc, price })));

    setTimeout(function () {
      conn.close();
    }, 500);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Cart API listening on " + process.env.PORT);
});
