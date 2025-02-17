import jwt from 'jsonwebtoken';

export const generateJWT = (userId, role) => {
    return new Promise((resolve, reject) => {
        const payload = { id: userId, role };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) {
                    reject('No se pudo generar el token');
                } else {
                    resolve(token);
                }
            }
        );
    });
};
