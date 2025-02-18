import { Router } from "express";
import { check } from "express-validator";  // Asegúrate de importar 'check' de express-validator
import { getUsers, getUserById, updateUser, deleteUser } from "../service/user.controller.js";
import { existeUsuarioById } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { tieneRole } from '../middlewares/roleMiddleware.js';

const router = Router();

router.get("/", getUsers);

router.get(
    "/findUser/:id", 
    [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    getUserById
);

router.put(
    '/:id',
    [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    updateUser
);

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),  // Asegúrate de tener este middleware definido correctamente
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    deleteUser
);

export default router;
