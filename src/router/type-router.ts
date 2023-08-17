import express, {RequestHandler} from 'express';
import typeController from "../controllers/type-controller";
import authMiddleware from "../middleware/auth-middleware";
import roleMiddleware from "../middleware/role-middleware";
const router = express.Router();

router.post('/add', authMiddleware as RequestHandler, roleMiddleware('ADMIN'), typeController.create)
router.get('/:id', authMiddleware as RequestHandler, roleMiddleware('ADMIN'), typeController.getOne)
router.get('/', authMiddleware as RequestHandler, roleMiddleware('ADMIN'), typeController.getAll)
router.delete('/:id', authMiddleware as RequestHandler, roleMiddleware('ADMIN'), typeController.delete)

export default router
