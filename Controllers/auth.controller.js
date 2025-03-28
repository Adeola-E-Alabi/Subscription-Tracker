import mongoose from "mongoose"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
//const { jsonwebtoken: jwt } = pkg;
import { JWT_EXPIRES_IN, JWT_SECRET } from "../Config/env.js";

export const signUp = async(req, res, next) => {
    
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const {name, email, password} = req.body
        const existingUser = await User.findOne({email})

        if (existingUser) {
            const error = new Error('User already Exists')
            error.statusCode = 409
            throw error
        }

        // Hash password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{name, email, password: hashedPassword, JournalEntries:{entry0:''}}], { session })
        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success:true,
            message:"User created Successfully",
            data:{
                token,
                user: newUsers[0]
            }
        })

    }

    catch (error){
        await session.abortTransaction();
        session.endSession();
        next(error)
    }
}

export const signIn = async(req, res, next) => {

   try {
     const {email, password} =req.body
     const user = await User.findOne( {email})

     if (!user) {
        const error = new Error("User not found")
        error.statusCode = 404;
        throw error;
     }

     const isPasswordValid = await bcrypt.compare(password, user.password)

     if(!isPasswordValid) {
        const error = new Error('invalid Password')
        console.log("Password was:", password)
        console.log("Password was supposed to be:", user.password)
        console.log("bycrpt.compare: ", isPasswordValid)
        error.statusCode = 401
        throw error
     }

     const token = jwt.sign({UserId: user._id}, JWT_SECRET, {expiresIn:JWT_EXPIRES_IN})

     res.status(200).json({
        success:true,
        message: 'User signed in successfully',
        data: {
            token,
            user
        }
     })
   }
   
   catch(error){
    next(error)
   }
}

export const signOut = async(req, res, next) => {
    
}