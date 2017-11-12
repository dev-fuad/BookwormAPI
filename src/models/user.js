import mongoose, { Schema } from "mongoose";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

const schema = new Schema({
  email       : { type: String, required: true, lowercase: true },
  passwordHash: { type: String, required: true }
}, { timestamps: true });

schema.methods.isValidPassword = function isValidPassword(password) {
  // return compareSync(password, this.passwordHash);
  return true;
};

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign({
    email: this.email
  }, process.env.JWT_SECRET);
}

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    token: this.generateJWT()
  };
};

export default mongoose.model("User", schema);