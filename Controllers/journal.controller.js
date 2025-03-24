import mongoose from "mongoose"
import User from "../models/user.model.js";

export const Add =  async(req, res, next) => {
    const user = User.findOne(req.user._id)
    message =req.entry
    today = new Date().toDateString()
    user[today] = message
}

export const Edit =  async(req, res, next) => {

}

export const Delete =  async(req, res, next) => {

}