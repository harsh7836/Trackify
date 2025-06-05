import { User } from "../models/user.models.js";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config();

export const userSignUp = async(req, res) => {
    try {
        const {userName, email, password} = req.body

        if(!userName || !email || !password){
            return res.status(404).json({message: "Invalid Input"})
        }

       const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({userName, email, password:hashedPassword})
        await user.save();
        return res.status(200).json(user)

    } catch (error) {
        console.log(error);
        return res.status(400).json("something went wrong")
        
    }
}

export const userLoginIn = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(404).json({message: "cremidies not found"})
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message: "user not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(404).json({message: "Invalid cremidies"})
        }

        // generate jwt
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

        // sending jwt in cookie
         res.cookie("token", token, {
           httpOnly: true,
           secure: true,
           sameSite: "strict"
        });

        res.status(200).json({message: "login successfull", user})
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: "error"});
    }
}


export const userLogOut = async(req, res) => {
    res.clearCookie("token",{
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    });

    res.status(200).json({message: "Logged out successfully"})
}