import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  role:String,
  email: String,
  phone:Number,
  password:String,
});
const User = mongoose.model("User", UserSchema);

export default User;
