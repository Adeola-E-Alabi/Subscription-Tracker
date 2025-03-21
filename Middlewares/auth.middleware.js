import { JWT_SECRET } from "../Config/env.js";
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";
const authorize = async (req, res, next) => {
    try{
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split( ' ')[1]
        }

        if(!token){
            return res.status(401).json({message:'Wrong Token'})
        }

        const decoded = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(decoded.UserId)

        if(!user){
            console.log(decoded)
            return res.status(401).json({message:"Wrong ID"})
        }

        req.user = user;
        next();
    }
    catch(error) {
        res.status(401).json({success:false, message:"Unauthorised"})
        next(error)
    }
}

export default authorize