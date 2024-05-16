import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name:String,
    gender:String,
    school:String,
    studentID:Number,
    phone:Number,
    classes:String,
    aadhar:Number,
    address:String,
    reason:String
});
const Student = mongoose.model("Student", StudentSchema);

export default Student;