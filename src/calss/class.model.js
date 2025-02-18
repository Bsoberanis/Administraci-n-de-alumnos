import { Schema, model } from "mongoose";

const ClassSchema = Schema({
    name:{
        type:String,
        required:[true,"Must have a name from the class"],
        minLenght: [4,"Must have more than 4 characters"]
    },
    description:{
        type:String,
        maxLenght: [100,"Must have less than 100 characters"]
    },
    teacher:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true,"Must have a teacher in the class"]
    },
    schedule:{
        type: String,
        required:[true,"Must have a schedule from the class"],
    }
},
{
    timestamps: true,
    versionKey: false,
});

export default model('Class', ClassSchema);