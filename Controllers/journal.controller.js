import mongoose from "mongoose"
import User from "../models/user.model.js";
import JournalEntries from '../models/JournalEntries.model.js'

export const Add =  async(req, res, next) => {

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        
        const {entry, date} = req.body
        const today = new Date().toDateString()

        const user = await User.findOne({ name: req.params.id })
        console.log(user)
        const duplicateEntry = await JournalEntries.findOne({date: req.body.date})
        if(duplicateEntry){
            const error = new Error("Invalid Date")
            throw error
        }
        
        console.log(duplicateEntry)
        const newEntry = await JournalEntries.create([{user:req.params.id, date, entry}], { session })
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ success: true, data: {newEntry}})
    }
    
    catch(Error){
        console.log(Error)
        res.status(400).json(Error)
    }
    
}

export const Edit =  async(req, res, next) => {

}

export const Delete =  async(req, res, next) => {

}