import { Schema, model } from "mongoose";

const UserSchema = Schema({
    name:{
        type: String,
        required: true,
        maxLenght: [25, "Cannot be overcome 25 characters"]
    },
    surname:{
        type: String,
        required: true,
        maxLenght: [25, "Cannot be overcome 25 characters"]
    },
    username:{
        type: String,
        required: true,
        maxLenght: [25, "Cannot be overcome 25 characters"]
    },
    email:{
        type: String,
        required: [true, "Emai is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        maxLenght: [8, "Password min required 8 characters"]
    },
    phone:{
        type: String,
        minLenght: 8,
        maxLenght: 8,
    },
    role:{
        type: String,
        required: true,
        enum: ["TEACHER_ROLE","STUDENT_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    }
},
{
    timestamps:true,
    versionKey: false
})

UserSchema.methods.toJson = function(){
    const {__v, password,_id,...usuario}= this.toObject();
    usuario.uid = _id;
    return usuario
}

export default model('User', UserSchema);


