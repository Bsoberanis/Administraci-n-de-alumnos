import User from '../models/User.js';
import Course from '../models/Course.js';

export const emailExists = async (email) => {
    const user = await User.findOne({ email });
    if (user) {
        throw new Error(`El correo ${email} ya está registrado`);
    }
};

export const courseExists = async (courseId) => {
    const course = await Course.findById(courseId);
    if (!course) {
        throw new Error(`El curso con ID ${courseId} no existe`);
    }
};

export const userExistsById = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error(`El usuario con ID ${userId} no existe`);
    }
};

export const canEnrollCourse = async (userId, courseId) => {
    const user = await User.findById(userId);
    if (user.courses.includes(courseId)) {
        throw new Error('Ya estás inscrito en este curso');
    }
    if (user.courses.length >= 3) {
        throw new Error('No puedes inscribirte en más de 3 cursos');
    }
};
