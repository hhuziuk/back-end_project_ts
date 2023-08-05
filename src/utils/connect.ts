require('dotenv').config();
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {User} from '../entities/user.entity'
import {Token} from '../entities/token.entity'

export const PostgresDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: true,
    entities: [User, Token],
    subscribers: [],
    migrations: [],
})
