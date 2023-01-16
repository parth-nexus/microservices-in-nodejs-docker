const express = require("express");
const app = express();
require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log("Payment micro listening on " + process.env.PORT);
});
