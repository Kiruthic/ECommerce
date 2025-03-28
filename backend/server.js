// const express = require('express'); Old way

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

const app = express();

dotenv.config();

app.get("/", (req, res) =>{
    res.send("Server is Ready");
});


app.listen(5001, () => {
    connectDB();
    console.log("Server started ");
});

