const express = require("express");
const app = express();
const Proxy = require("express-http-proxy");

app.get("/cart", Proxy("http://localhost:3001"));
app.post("/add-to-cart", Proxy("http://localhost:3001"));

app.get("/dashboard", Proxy("http://localhost:3002"));
app.post("/dashboard", Proxy("http://localhost:3002"));

app.use("/help", Proxy("http://localhost:3003"));
app.post("/help", Proxy("http://localhost:3003"));

app.use("/payment", Proxy("http://localhost:3004"));
app.post("/payment", Proxy("http://localhost:3004"));

app.use("/profile", Proxy("http://localhost:3005"));
app.post("/profile", Proxy("http://localhost:3005"));

app.listen(3000, () => {
  console.log("Gateway running on port 3000");
});
