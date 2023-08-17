import express, {RequestHandler} from 'express';
import publisherController from "../controllers/publisher-controller";
import authMiddleware from "../middleware/auth-middleware";
import roleMiddleware from "../middleware/role-middleware";
const router = express.Router();

router.post('/add', authMiddleware as RequestHandler, roleMiddleware('ADMIN'), publisherController.create)
router.get('/:id', authMiddleware as RequestHandler, roleMiddleware('ADMIN'), publisherController.getOne)
router.get('/', authMiddleware as RequestHandler, roleMiddleware('ADMIN'), publisherController.getAll)
router.delete('/:id', authMiddleware as RequestHandler, roleMiddleware('ADMIN'), publisherController.delete)

export default router
