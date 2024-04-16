const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://riser:ZwRK6xEkY31lVN5M@cluster0.b8sjm4i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const clients = new MongoClient(uri);

const database = clients.db("test");
const products = database.collection("products");
const orders = database.collection("orders");

module.exports = {
  products,
  orders,
};
