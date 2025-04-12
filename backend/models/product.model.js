import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Product = mongoose.model('Product', productSchema); //it will get the products collection

export default Product;