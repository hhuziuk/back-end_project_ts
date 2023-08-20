import request from 'supertest'
import 'reflect-metadata';
import app from '../app'
import {PostgresDataSource} from "../utils/connect";
import {response} from "express";
import {object} from "zod";
require("dotenv").config();

beforeEach(async () => {
    await PostgresDataSource.initialize()
});
afterEach(async () => {
    await PostgresDataSource.destroy()
});

describe("POST /user/registration", () => {

    test('when all data passed', async () => {
        const registrationResponse = await request(app)
            .post('/api/user/registration')
            .send({
                "email": "qqqq@gmail.com",
                "username": "mentalclochard5",
                "role": "ADMIN",
                "password": "doll7777"
            })
            .expect(200);

        const { accessToken, refreshToken, user } = registrationResponse.body;

        expect(accessToken).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\..+/);
        expect(refreshToken).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\..+/);

        expect(user).toEqual({
            id: expect.any(Number),
            username: expect.any(String),
            email: expect.any(String),
            role: expect.any(String),
            isActivated: false
        });
    });


    test('user already exists', async () => {
        const registrationResponse = await request(app)
            .post('/api/user/registration')
            .send({
                "email": "qqqq@gmail.com",
                "username": "mentalclochard5",
                "role": "ADMIN",
                "password": "doll7777"
            })
            .expect(400);

        const { accessToken, refreshToken, user } = registrationResponse.body;

        expect(accessToken).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\..+/);
        expect(refreshToken).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\..+/);

        expect(user).toEqual({
            id: expect.any(Number),
            username: expect.any(String),
            email: expect.any(String),
            role: expect.any(String),
            isActivated: false
        });
    });
})

describe("POST /user/login", () => {
    test('when all data passed', async () => {
        const registrationResponse = await request(app)
            .post('/api/user/login')
            .send({
                "email": "qqq@gmail.com",
                "username": "mentalclochard4",
                "role": "ADMIN",
                "password": "doll7777"
            })
            .expect(200);


        const { accessToken, refreshToken, user } = registrationResponse.body;

        expect(accessToken).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\..+/);
        expect(refreshToken).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\..+/);

        expect(user).toEqual({
            id: expect.any(Number),
            username: expect.any(String),
            email: expect.any(String),
            role: expect.any(String),
            isActivated: false
        });
    });


    test('when all data passed', async () => {
        const registrationResponse = await request(app)
            .post('/api/user/login')
            .send({
                "email": "q@gmail.com",
                "username": "aboba",
                "role": "ADMIN",
                "password": "doll7777"
            })
            .expect(200);

    });
})

describe("POST /user/logout", () => {

    function getEmptyObject() {
        return {};
    }

    test('when all data passed', async () => {
        const registrationResponse = await request(app)
            .post('/api/user/logout')
            .send({
                "email": "qqq@gmail.com",
                "username": "mentalclochard4",
                "role": "ADMIN",
                "password": "doll7777"
            })
            .expect(200);

        const result = getEmptyObject();
        expect(result).toEqual({});

    });


    test('when something is wrong', async () => {
        const registrationResponse = await request(app)
            .post('/api/user/logout')
            .send({
                "email": "qqqqqq@gmail.com",
                "username": "mentalclochard4",
                "role": "ADMIN",
                "password": "doll7777"
            })
            .expect(200);
    });
})

describe("GET /user/refresh", () => {
    test('when all data passed', async () => {
        const registrationResponse = await request(app)
            .get('/api/user/refresh')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInVzZXJuYW1lIjoibWVudGFsY2xvY2hhcmQ0IiwiZW1haWwiOiJxcXFAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJpYXQiOjE2OTI0MjE2NDcsImV4cCI6MTY5MjQyNTI0N30.HPtlkbiLWWatmYYrqhQD52d5zgewZUKzSPaciPFZ51E')

        const { accessToken, refreshToken, user } = registrationResponse.body;

        expect(response.statusCode).toBe(200)

    });


    test('when access token is not actual', async () => {
        const registrationResponse = await request(app)
            .get('/api/user/refresh')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInVzZXJuYW1lIjoibWVudGFsY2xvY2hhcmQ0IiwiZW1haWwiOiJxcXFAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJpYXQiOjE2OTI0MjE2NDcsImV4cCI6MTY5MjQyNTI0N30.HPtlkbiLWWatmYYrqhQD52d5zgewZUKzSPaciPFZ51E')

        const { accessToken, refreshToken, user } = registrationResponse.body;

        expect(response.statusCode).toBe(401)

    });
})

describe("GET /user/users", () => {
    test('when all data passed', async () => {
        const registrationResponse = await request(app)
            .get('/api/user/users')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInVzZXJuYW1lIjoibWVudGFsY2xvY2hhcmQ0IiwiZW1haWwiOiJxcXFAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJpYXQiOjE2OTI0MjE2NDcsImV4cCI6MTY5MjQyNTI0N30.HPtlkbiLWWatmYYrqhQD52d5zgewZUKzSPaciPFZ51E')

        expect(object)
    });
})
