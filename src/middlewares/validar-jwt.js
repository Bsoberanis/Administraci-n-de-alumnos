import jwt from 'jsonwebtoken';

export const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({ message: 'No hay token en la petición' });
    }

    try {
        const { id, role } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id, role };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token no válido' });
    }
};

