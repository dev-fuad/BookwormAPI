import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import auth from "./routes/auth";

// Setup
const app = express();
dotenv.config();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, { useMongoClient: true });

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/auth", auth);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, () => console.log('listening on port: 8080'));