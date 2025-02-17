import rateLimit from 'express-rate-limit';

export const limitRequests = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Límite de 100 peticiones por IP
    message: {
        status: 429,
        message: 'Demasiadas peticiones desde esta IP, por favor intenta más tarde.'
    }
});

