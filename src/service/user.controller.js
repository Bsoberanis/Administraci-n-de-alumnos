import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // No devolver contraseñas
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let updateData = { name, email };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        res.json({ message: 'Usuario actualizado', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
};
