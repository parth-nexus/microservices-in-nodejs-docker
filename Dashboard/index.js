const express = require("express");
const app = express();
require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log("Dashboard micro listening on " + process.env.PORT);
});
