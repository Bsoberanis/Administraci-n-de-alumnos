import mongoose from 'mongoose';

export const PetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true, enum: ['perro', 'gato', 'otro'] },
    age: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

