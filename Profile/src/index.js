const express = require("express");
const app = express();
require("dotenv").config();
let amqp = require("amqplib");

(async () => {
  const queue = "tasks";
  const conn = await amqp.connect("amqp://172.21.0.8");
  const ch1 = await conn.createChannel();
  await ch1.assertQueue(queue);

  console.log("Profile micoservice waiting for tasks...");
  ch1.consume(queue, (msg) => {
    if (msg !== null) {
      console.log("Recieved:", JSON.parse(msg.content.toString()));
      ch1.ack(msg);
      console.log("Profile micoservice waiting for tasks...");
    } else {
      console.log("Consumer cancelled by server");
    }
  });
})();
