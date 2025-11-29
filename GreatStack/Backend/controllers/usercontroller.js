import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

//Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne(email);
        if (!user) {
            res.json({ success: false, message: "User doesnt exists!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, message: "Incorrect password!" });
        }
    } catch (error) {
        console.log("Somrthing is wrong", error);
        res.json({ success: false, message: error.message });
    }
}



//route for registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.json({ success: false, message: "User already exists!" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Email invalid!" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password should have at least 8 characters!" });
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);//length of salt probably.
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        const token = createToken(user._id);//there is a default id attached to each field
        res.json({ success: true, token });

    } catch (error) {
        console.log("Registration Error");
        res.json({ success: false, message: error.message });
    }
}

//route for admiin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, message: "Invalid Credentials!" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export { registerUser, loginUser, loginAdmin };