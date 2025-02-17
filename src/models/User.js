import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: 'STUDENT_ROLE' },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

export default mongoose.model('User', UserSchema);

