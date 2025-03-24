import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema(
    {user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index: true,
        },
    
    date:{
        type:String,
        required:true
    },

    entry:{
        type:String,
        required:true
    }
    },

    {
        timestamps:true,
    }
)

const JournalEntry = mongoose.model("JournalEntry", EntrySchema);

export default JournalEntry