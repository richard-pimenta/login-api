import mongoose = require('mongoose');
import bcrypt = require('bcryptjs');
import{UserSchemaInterface}from "../interfaces"


const userSchema = new mongoose.Schema<UserSchemaInterface>(
  {
    
    name: { type: String, require: true },
    lastname: { type: String, require: true },
    username: { type: String, unique: true, require: true, lowercase: true },
    password: { type: String, require: true, select: false },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'UserLogin' }
);

userSchema.pre<UserSchemaInterface>("save", async function (next) {
  const user = this;
  const hash =  await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});
export const UserModel = mongoose.model('UserLogin', userSchema, 'UserLogin');
