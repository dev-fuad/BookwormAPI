import mongoose, { Schema } from "mongoose";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import uniqueValidator from "mongoose-unique-validator";

const schema = new Schema({
  email       : { type: String, required: true, lowercase: true, index: true, unique: true },
  passwordHash: { type: String, required: true },
  confirmed   : { type: Boolean, default: false }
}, { timestamps: true });

schema.methods.isValidPassword = function isValidPassword(password) {
  return compareSync(password, this.passwordHash);
  // return true;
};

schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = hashSync(password, 10);
}

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign({
    email: this.email
  }, process.env.JWT_SECRET);
}

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email    : this.email,
    confirmed: this.confirmed,
    token    : this.generateJWT()
  };
};

schema.plugin(uniqueValidator, { message: "Email already exists" });

export default mongoose.model("User", schema);