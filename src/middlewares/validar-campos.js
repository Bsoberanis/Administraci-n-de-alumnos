import { validationResult } from "express-validator";

export const validarCampos = (req, res, next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const e = next(errors);
        return res.status(200).json({
            e
        })
    }
    next();
}

