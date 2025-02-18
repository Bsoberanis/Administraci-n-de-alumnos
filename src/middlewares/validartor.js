import { body } from "express-validator"
import { validarCampos } from "./validar-campos.js"
import { existenteEmail, esRoleValido } from "../helpers/db-validator.js"

export const registerValidator = [
    body("name", "The name is required").not().isEmpty(),
    body("surname", "The surname is required").not().isEmpty(),
    body("email", "Must enter a valid email").isEmail(),
    body("email").custom(existenteEmail),
    body('role').custom(esRoleValido),
    body("password", "Password must be at least 6 characters").isLength({min:8}),
    validarCampos
]

export const loginValidator = [
    
]

