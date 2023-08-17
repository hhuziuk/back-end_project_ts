import express, {RequestHandler} from 'express';
import bookController from "../controllers/book-controller";
import authMiddleware from "../middleware/auth-middleware";
const router = express.Router();

router.post('/add', authMiddleware as RequestHandler, bookController.create)
router.get('/:id', authMiddleware as RequestHandler, bookController.getOne)
router.get('/', authMiddleware as RequestHandler, bookController.getAll)
router.delete('/:id', authMiddleware as RequestHandler, bookController.delete)

export default router
