import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import auth from "./routes/auth";
import user from "./routes/user";
import books from "./routes/books";

// Setup
const app = express();
dotenv.config();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, { useMongoClient: true });

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/books", books);

app.get("/*", (req, res) => {
  res.send(`
  <div>
    <h1>Welcome to Bookworm</h1>
  </div>
  `);
});

module.exports = app;