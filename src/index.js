const express = require("express");
const cors = require("cors");
const productRoutes = require("./router/productRoutes");
const orderRoutes = require("./router/orderRoutes");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());

const port = 5000;

app.use(bodyParser.json());
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("<h2>Hello Word</h2>");
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
