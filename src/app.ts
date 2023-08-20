import fileUpload from "express-fileupload";

require('dotenv').config()
import express from "express"
import cors from 'cors'
import logger from './utils/logger'
import {PostgresDataSource} from './utils/connect'
import cookieParser from "cookie-parser";
import router from './router/index'
import errorMiddleware from "./middleware/error-middleware";
import swaggerUi from "swagger-ui-express"
import * as swaggerDocument from "./swagger.json";

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.json())
app.use(cors())
app.use(fileUpload({}))
app.use(cookieParser())
app.use('/api', router)
app.use(errorMiddleware)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

export default app
