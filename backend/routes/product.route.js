import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
const router = express.Router();

router.get("/", async(req, res) =>{
    try {
        const products = await Product.find();
        res.status(200).json({success : true, data: products});
    } catch(error) {
        console.log("Error in getting products: ", error.message);
        res.status(500).json({success : false, message: "Error in getting products"});
    }
});

router.get("/:id", async(req, res) => {
    const {id} = req.params;
    try {
        const product = await Product.findById(id);
        console.log(id);
        console.log(product);
        res.status(200).json({success: true, data: product});
    } catch(error) {
        console.log("Error in getting product: ", error.message);
        res.status(404).json({success: false, message: "Object Not Found"});
    }
});

router.post("", async(req, res) =>{
    const product = req.body; // user data

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success : false, message : "Please provide all fields"});
    }
    const newProduct = new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({success : true, data: newProduct});
    } catch(error) {
        console.error("Error in creating product: ", error.message);
        res.status(500).json({success : false, message: "Internal Server Error"});
    }
    res.send("Product Added");
});

router.put("/:id", async(req, res) => {
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success : false, message : "Object Not Found"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch(error) {
        console.log("Error in updating product: ", error.message);
        res.status(500).json({success : false, message: "Error while updating product"});
    }
});
router.delete("/:id", async(req, res) => {
    const {id} = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(204).json({success: true});
    } catch(error) {
        console.error("Error in deleting product: ", error.message);
        res.status(404).json({success : false, message: "Object Not Found"});
    }
});
export default router;