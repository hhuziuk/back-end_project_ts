import express, {RequestHandler} from 'express';
import userRouter from "./user-router";
import bookRouter from "./book-router";
import publisherRouter from "./publisher-router";
import typeRouter from "./type-router";
const router = express.Router();

router.use('/user', userRouter)
router.use('/book',  bookRouter)
router.use('/publisher', publisherRouter)
router.use('/type', typeRouter)

export default router
