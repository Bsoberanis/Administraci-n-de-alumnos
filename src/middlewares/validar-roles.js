export const validarRoles = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({ message: 'Se quiere verificar el rol sin validar el token primero' });
        }

        if (!rolesPermitidos.includes(req.user.role)) {
            return res.status(403).json({ message: 'No tienes permisos para realizar esta acción' });
        }

        next();
    };
};
