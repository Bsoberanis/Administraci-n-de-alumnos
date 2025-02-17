import mongoose from 'mongoose';

// Definir constantes para los roles
export const ROLES = {
    TEACHER_ROLE: 'TEACHER_ROLE',
    STUDENT_ROLE: 'STUDENT_ROLE',
};

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: [ROLES.TEACHER_ROLE, ROLES.STUDENT_ROLE], // Usar constantes
        unique: true, // Asegura que no haya roles duplicados
    }
});

// Crear el modelo
export const Role = mongoose.model('Role', roleSchema);

