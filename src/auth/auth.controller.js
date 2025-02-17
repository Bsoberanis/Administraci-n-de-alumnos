import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Course from '../models/Course.js';

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'El usuario ya existe' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: 'STUDENT_ROLE', // Solo se permite registro de estudiantes
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
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas' });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

export const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const user = await User.findById(req.user.id);
        const course = await Course.findById(courseId);

        if (user.role !== 'STUDENT_ROLE') return res.status(403).json({ message: 'No autorizado' });
        if (!course) return res.status(404).json({ message: 'Curso no encontrado' });
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
        const user = await User.findById(req.user.id).populate('courses', 'title description');
        res.json({ courses: user.courses });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true });
        res.json({ message: 'Perfil actualizado', user });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

export const deleteProfile = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.json({ message: 'Cuenta eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

export const createCourse = async (req, res) => {
    try {
        if (req.user.role !== 'TEACHER_ROLE') return res.status(403).json({ message: 'No autorizado' });
        const { title, description } = req.body;
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
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Curso no encontrado' });
        if (course.teacher.toString() !== req.user.id) return res.status(403).json({ message: 'No autorizado' });
        
        course.title = title;
        course.description = description;
        await course.save();

        res.json({ message: 'Curso actualizado', course });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Curso no encontrado' });
        if (course.teacher.toString() !== req.user.id) return res.status(403).json({ message: 'No autorizado' });

        await User.updateMany({ courses: courseId }, { $pull: { courses: courseId } });
        await course.deleteOne();
        
        res.json({ message: 'Curso eliminado y alumnos desasignados' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};
