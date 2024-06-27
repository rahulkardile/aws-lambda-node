import serverless from "serverless-http";
import express from "express"
import dotenv from "dotenv"

import UserController from "./user/UserController.js"
import mongoose from "mongoose";

const app = express();
dotenv.config();

const dataname = process.env.data;
var mongo = process.env.mongodb;

try {
    mongoose.connect(mongo);
    console.log("Database is connected!")
} catch (error) {
    console.log("database is not connected");
}


app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from " + dataname + "!",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use('/users', UserController);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

export const handler = serverless(app);
