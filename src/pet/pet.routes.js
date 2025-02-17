import mongoose from 'mongoose';

export const RoleSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true, 
        enum: ['TEACHER_ROLE', 'STUDENT_ROLE'] 
    },
});


