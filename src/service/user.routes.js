import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarRoles } from '../middlewares/validar-roles.js';
import { 
    getUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} from '../controllers/user.controller.js';

export const router = Router();

router.get('/', [
    validarJWT,
    validarRoles('TEACHER_ROLE'),
    validarCampos
], getUsers);

router.get('/:id', [
    validarJWT,
    validarCampos
], getUserById);

router.put('/:id', [
    validarJWT,
    check('name', 'El nombre es obligatorio').optional().not().isEmpty(),
    check('email', 'Debe ser un correo válido').optional().isEmail(),
    validarCampos
], updateUser);

router.delete('/:id', [
    validarJWT,
    validarCampos
], deleteUser);

