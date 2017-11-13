import express from "express";
import User from "../models/user";
import parser from "../utility/parser";

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body.user;
  if (!email || !password) {
    res.status(401).json({ errors: { global: "Empty credentials" }});
    return;
  }
  const user = new User({ email });
  user.setPassword(password);
  user.save()
    .then(userRecord => res.json({ user: userRecord.toAuthJSON() }))
    .catch(err => res.status(400).json({ errors: parser(err.errors) }));
});

export default router;