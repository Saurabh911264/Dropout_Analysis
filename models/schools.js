import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema({
    name : String,
    email: String,
    phone:Number,
    ID:Number,
    district:String,
    PIN:Number
});
const School = mongoose.model("School", SchoolSchema);

export default School;