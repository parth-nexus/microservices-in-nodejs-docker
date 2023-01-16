const express = require("express");
const app = express();
const expressProxy = require("express-http-proxy");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/cart", expressProxy("http://localhost:3001"));
app.use("/dashboard", expressProxy("http://localhost:3002"));
app.use("/help", expressProxy("http://localhost:3003"));
app.use("/payment", expressProxy("http://localhost:3004"));
app.use("/profile", expressProxy("http://localhost:3005"));

app.listen(3000, () => {
  console.log("Gateway running on port 3000");
});
