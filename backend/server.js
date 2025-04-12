// const express = require('express'); Old way

import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

import productRoutes from "./routes/product.route.js";
dotenv.config();

const app = express();

app.get("/", (req, res) =>{
    res.send("Server is Ready");
});

app.use(express.json()); //allows us to accept json data in req.body

app.use("/api/products", productRoutes);

app.listen(5002, () => {
    connectDB();
    console.log("Server started ");

});

