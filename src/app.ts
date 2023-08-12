import dotenv from 'dotenv';
dotenv.config()
import express from "express"
import cors from 'cors'
import logger from './utils/logger'
import {PostgresDataSource} from './utils/connect'
import cookieParser from "cookie-parser";
import router from './router/index'
import errorMiddleware from "./middleware/error-middleware";

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api', router)
app.use(errorMiddleware)
const start = async() => {
    try{
        await PostgresDataSource.initialize()
            .catch((error) => console.log(error))
        app.listen(PORT, () => {logger.info(`app is running on ${PORT} port`)})
    } catch(e){
        logger.error(e)
    }
}

start();
