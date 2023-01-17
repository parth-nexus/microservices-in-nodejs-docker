const express = require("express");
const app = express();
const Proxy = require("express-http-proxy");

app.get("/cart", Proxy("http://172.21.0.3:3001"));
app.post("/add-to-cart", Proxy("http://172.21.0.3:3001"));

app.get("/dashboard", Proxy("http://172.21.0.4:3002"));
app.post("/dashboard", Proxy("http://172.21.0.4:3002"));

app.get("/help", Proxy("http://172.21.0.5:3003"));
app.post("/help", Proxy("http://172.21.0.5:3003"));

app.get("/payment", Proxy("http://172.21.0.6:3004"));
app.post("/payment", Proxy("http://172.21.0.6:3004"));

app.get("/profile", Proxy("http://172.21.0.7:3005"));
app.post("/profile", Proxy("http://172.21.0.7:3005"));

app.listen(3000, () => {
  console.log("Gateway running on port 3000");
});
