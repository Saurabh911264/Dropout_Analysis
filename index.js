import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import { spawn } from 'child_process';
mongoose.connect("mongodb://127.0.0.1:27017", {
    dbName: "Graphs"
}).then(() => console.log("Database Connected"))
    .catch((e) => console.log(e));
const UserSchema = new mongoose.Schema({
    role:String,
    email: String,
    phone:Number,
    password:String,
});
const User = mongoose.model("User", UserSchema);

const SchoolSchema = new mongoose.Schema({
    name : String,
    email: String,
    phone:Number,
    ID:Number,
    district:String,
    PIN:Number
});
const School = mongoose.model("School", SchoolSchema);

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

let message;
var flag = 0;
const app = express();
const users = [];
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
const is_Authenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        const decoded = jwt.verify(token, "setjdjdrshagwe");
        req.user = await User.findById(decoded._id)
        next();
    } else {
        res.redirect("/login");
    }
};
app.get("/", (req, res) => {
    res.redirect("/login");
});
app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/graphs", (req, res) => {
    res.render("graphs"); 
});
app.post("/login", async (req, res) => {
    const { email } = req.body;
    let user = await User.findOne({ email });
    let school = await School.findOne({ email });
    console.log(user);
    console.log(school);
    if (!user && !school) {
        res.redirect("/register");
        return;
    }
    if(user.role=="School"){
        return res.redirect("/home_school");
    }
    else if(user.role=="district"){
        return res.redirect("/home_district");
    }
    else{
        return res.redirect("/home_admin");
    }
    
});
app.post("/schoolAuthority", (req, res) => {
    const selectedAuthority = req.body.authority;
    if (selectedAuthority === "school") {
        res.render("schoolRegisterPage");
    } else if (selectedAuthority === "district") {
        res.render("districtRegisterPage");
    } else {
        res.render("errorPage");
    }
});
app.get("/logout", (req, res) => {
    res.render("logout");
});
app.get("/schoolRegisterPage", (req, res) => {
    if(flag==0){
        res.render("schoolRegisterPage",{message:""});
    }
    else{
        res.render("schoolRegisterPage",{message:"Email already exists"});
    }
});
app.post("/schoolRegisterPage", async (req, res) => {
    let role = "School";
    const { email, phone, password, confirmPassword} = req.body;
    let user = await User.findOne({ email });
    if (user) {
        flag = 1;
        return res.render("schoolRegisterPage");
    }
    user = await User.create({
        role:role,
        email: email,
        phone: phone, 
        password: password
    });
    const token = jwt.sign({ _id: user._id }, "sjdtfwgwkec");
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000)
    });
    res.redirect("/schoolInfo");
});
app.post("/schoolInfo", async (req, res) => {
    const { email, phoneNumber, district, pincode, school, schoolID } = req.body;
    let user;
    user = await School.create({
        name: school,
        email,
        phone: phoneNumber,
        ID: schoolID,
        district,
        PIN: pincode
    })
    const token = jwt.sign({ _id: user._id }, "sjdtfwgwkec");
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000)
    });
    res.redirect("/login");  
});


app.get("/schoolInfo", (req, res) => {
    res.render("schoolInfo");
});

app.get("/register", (req, res) => {
    res.render("register");
});
app.get("/askAuthority", (req, res) => {
    res.render("askAuthority"); 
});
app.post("/askAuthority", (req, res) => {
    const selectedAuthority = req.body.authority;
    if(selectedAuthority=="school"){
        res.redirect("/schoolRegisterPage")
    }
    else{
        res.render("districtRegister")
    }
});
// app.post("/register", async (req, res) => {
//     const { name, email } = req.body;
//     let user = await User.findOne({ email });
//     if (user) {
//         return res.redirect("/login");
//     }
//     user = await User.create({
//         name,
//         email,
//     });
//     const token = jwt.sign({ _id: user._id }, "sjdtfwgwkec");
//     res.cookie("token", token, {
//         httpOnly: true,
//         expires: new Date(Date.now() + 60 * 1000)
//     });
//     res.redirect("/login");
// });

app.get("/home_school", (req, res) => {
    res.render("home_school");
});

// Add a new route to handle POST requests for adding dropped out students
app.post("/add_student", async (req, res) => {
    const { name, school, studentID, phone, classes,aadhar, address, reason } = req.body;
    let user;
    user = await Student.create({
        name: name,
        gender:"Male",  
        school:school,
        studentID: studentID,
        phone: phone,
        classes:classes,
        aadhar:aadhar,
        address:address,
        reason:reason
    })
    const token = jwt.sign({ _id: user._id }, "sjdtfwgwkec");
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000)
    });
    res.render("graphs2")
});

app.get("/graphs2", (req, res) => {
    res.render("graphs2");
});


app.get("/add_student", (req, res) => {
    res.render("add_student");
});
app.get('/data1', async (req, res) => {
    try {
      const data = await School.find({}).limit(10);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});

app.get('/data2', async (req, res) => {
    try {
        const data = await School.aggregate([
            {
                $group: {
                    _id: '$UNITS',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    UNITS: '$_id',
                    count: 1
                }
            }
        ]);

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// send_mail
app.post('/send-email', (req, res) => {
    const { to, subject, body } = req.body;
  
    // Spawn the Python script as a child process
    const pythonProcess = spawn('python', ['send_email.py', to, subject, body]);
  
    // Handle the end of the process
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        res.json({ success: true, message: 'Email sent successfully' });
      } else {
        res.status(500).json({ success: false, message: 'Error sending email' });
      }
    });
  });
//


app.listen(5000, () => {
    console.log("Server is working");
});