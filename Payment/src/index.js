const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const os = require("os");
const numCpu = os.cpus().length;
const cluster = require("cluster");

const { MongoClient, ServerApiVersion } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_URI_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function dbconn() {
  const dbconn = await client.connect();
  const DBconnection = dbconn.db("dashboard");
  global.DBconnection = DBconnection;
}
dbconn()
  .then(() => {
    app.get("payment", (req, res) => {
      res.render("payment works");
    });

    if (cluster.isPrimary) {
      console.log(
        "\n\n\n   😲 You have " + numCpu + " logical processors so im creating"
      );
      console.log(numCpu + " clusters 🤩 \n");
      console.log(
        "All clusters will listen on PORT: " +
          process.env.SERVER_PORT +
          "\n\n\n"
      );
      for (let i = 0; i < numCpu; i++) {
        cluster.fork();
      }
    } else {
      app.listen(process.env.SERVER_PORT, () => {
        console.log(
          `Payment API Cluster ${process.pid} running ✅ and Db connected`
        );
      });
    }
  })
  .catch((e) => {
    console.log("database connection error \n", e);
    process.exit(1);
  });
