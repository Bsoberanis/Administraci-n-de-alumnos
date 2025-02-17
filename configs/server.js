import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../src/models/User.js';
import express from 'express';



const app = express(); // 👈 Asegúrate de que esta línea esté presente

export function iniciarServidor() {
    app.listen(3000, () => {
        console.log('Servidor corriendo en el puerto 3000');
    });
}


export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: 'Todos los campos son obligatorios' });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'El usuario ya existe' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'STUDENT_ROLE',
            courses: []
        });

        await user.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};




export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Todos los campos son obligatorios' });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

export const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        if (!courseId) return res.status(400).json({ message: 'El ID del curso es obligatorio' });

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        if (user.role !== 'STUDENT_ROLE') return res.status(403).json({ message: 'No autorizado' });
        if (user.courses.includes(courseId)) return res.status(400).json({ message: 'Ya estás inscrito en este curso' });
        if (user.courses.length >= 3) return res.status(400).json({ message: 'No puedes inscribirte en más de 3 cursos' });

        user.courses.push(courseId);
        await user.save();
        res.json({ message: 'Inscripción exitosa', courses: user.courses });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

export const viewEnrolledCourses = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('courses');
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        res.json({ courses: user.courses });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name && !email) return res.status(400).json({ message: 'Debe proporcionar al menos un campo para actualizar' });

        const user = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        res.json({ message: 'Perfil actualizado', user });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

export const deleteProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        res.json({ message: 'Cuenta eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

export const createCourse = async (req, res) => {
    try {
        if (req.user.role !== 'TEACHER_ROLE') return res.status(403).json({ message: 'No autorizado' });
        const { title, description } = req.body;
        if (!title || !description) return res.status(400).json({ message: 'Todos los campos son obligatorios' });

        const course = new Course({ title, description, teacher: req.user.id });
        await course.save();
        res.json({ message: 'Curso creado', course });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

export const editCourse = async (req, res) => {
    try {
        const { courseId, title, description } = req.body;
        if (!courseId || !title || !description) return res.status(400).json({ message: 'Todos los campos son obligatorios' });

        const course = await Course.findByIdAndUpdate(courseId, { title, description }, { new: true });
        if (!course) return res.status(404).json({ message: 'Curso no encontrado' });

        await User.updateMany({ courses: courseId }, { $set: { 'courses.$[elem].title': title, 'courses.$[elem].description': description } }, { arrayFilters: [{ 'elem': courseId }] });

        res.json({ message: 'Curso actualizado y alumnos actualizados', course });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        if (!courseId) return res.status(400).json({ message: 'El ID del curso es obligatorio' });

        await User.updateMany({ courses: courseId }, { $pull: { courses: courseId } });
        await Course.findByIdAndDelete(courseId);
        res.json({ message: 'Curso eliminado y alumnos desasignados' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};
