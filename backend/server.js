// Import necessary packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ProductData=require("./modal")
require("dotenv").config();


// Create an Express app
const app = express(
  {cors:{origin:"*",
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true}}
);

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);

// Set up a database connection using Mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo-db connected!");
  })

// Set up a route to handle product data submission
app.post("/productData", async (req, res) => {
  try {
    // Extract product data from the request body
    const { productName, price, category, timeAdded, decription, rating, urlToImage, like } = req.body;

    // Create a new product data document
    const productData = new ProductData({
        productName,
        price,
        category,
        timeAdded,
        decription,
        rating,
        urlToImage,
        like
    });

    // Save the product data to the database
    await productData.save();

    // Send a success response
    res.status(200).send("Product data saved successfully");
  } catch (err) {
    // Send an error response if something went wrong
    res.status(500).send("Error saving Product data: " + err.message);
  }
});

app.get("/productData", async (req, res) => {
  const productData = await ProductData.find()
  res.status(200).send(productData)
})

///////////////////////////////////

app.get("/productData/:category", (req, res) => {
  const { category } = req.params;
  console.log(req.params);
  ProductData
    .find({ category })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

/////////////////////////////////

app.get("/productData/:id", async (req, res) => {
  const { id } = req.params
  
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such Product Found'})
  }

  const productData = await ProductData.findById(id)

  if(!productData) {
    return res.status(404).json({error: 'No such Product Found'})
  }

  res.status(200).json(productData)
})

app.delete("/productData/:id", async (req, res) => {
  const { id } = req.params
  
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such Product Found'})
  }

  const productData = await ProductData.findOneAndDelete({_id:id})

  if(!productData) {
    return res.status(404).json({error: 'No such Product Found'})
  }

  res.status(200).json(productData)
})


// Start the server
app.listen(process.env.PORT, () => {
  console.log("Server started on port", process.env.PORT);
});