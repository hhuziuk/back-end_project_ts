import express, {RequestHandler} from 'express';
import userController from "../controllers/user-controller";
import authMiddleware from "../middleware/auth-middleware";
import roleMiddleware from "../middleware/role-middleware";
const router = express.Router();

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware as RequestHandler, roleMiddleware('ADMIN'), userController.getUsers)

export default router
