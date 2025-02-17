import express from 'express';
import { register, login, enrollCourse, viewEnrolledCourses, updateProfile, deleteProfile, createCourse, editCourse, deleteCourse } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

export const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/enroll', authMiddleware, enrollCourse);
router.get('/courses', authMiddleware, viewEnrolledCourses);
router.put('/profile', authMiddleware, updateProfile);
router.delete('/profile', authMiddleware, deleteProfile);

router.post('/course', authMiddleware, createCourse);
router.put('/course', authMiddleware, editCourse);
router.delete('/course', authMiddleware, deleteCourse);




