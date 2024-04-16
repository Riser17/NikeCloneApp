const express = require("express");
const productRoutes = require("./router/productRoutes");
const orderRoutes = require("./router/orderRoutes");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("<h2>Hello Word</h2>");
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
