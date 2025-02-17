import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    role: {
        type: String,
        enum: ['STUDENT_ROLE', 'TEACHER_ROLE'],
        default: 'STUDENT_ROLE'
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
}, {
    timestamps: true
});


