import { check } from 'express-validator';

export const validarRegistro = [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo electrónico no es válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
];

export const validarLogin = [
    check('email', 'El correo electrónico es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
];

export const validarCurso = [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
];

export const validarInscripcionCurso = [
    check('courseId', 'El ID del curso es obligatorio').not().isEmpty(),
];

export const validarEdicionPerfil = [
    check('name', 'El nombre no puede estar vacío').optional().not().isEmpty(),
    check('email', 'Debe ser un correo válido').optional().isEmail(),
];

