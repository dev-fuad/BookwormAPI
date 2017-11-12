import express from "express";
import User from "../models/user";

const router = express.Router();

router.post("/", (req, res) => {
  const { credentials } = req.body;
  if (!credentials) {
    res.status(401).json({ errors: { global: "Empty credentials" }});
    return;
  }
  User.findOne({ email: credentials.email })
      .then(user => {
        if (user && user.isValidPassword(credentials.password)) {
          res.json({ user: user.toAuthJSON() });
        } else {
          res.status(401).json({ errors: { global: "Invalid credentials" }});
        }
      });
});

export default router;