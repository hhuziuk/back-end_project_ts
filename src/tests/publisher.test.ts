import {jest} from '@jest/globals';
import 'reflect-metadata';
import {PostgresDataSource} from "../utils/connect";
import axios from "axios";
import publisherService from "../services/publisher-service";
import bookService from "../services/book-service";
require("dotenv").config();

jest.mock('axios')

beforeEach(async () => {
    await PostgresDataSource.initialize()
});
afterEach(async () => {
    await PostgresDataSource.destroy()
});

describe("POST api/publisher/add", () => {
    let response;
    beforeEach(() => {
        response = {
            data:
                {
                    "name": "Alte Literatur",
                    "id": 6
                }
        };

        (axios.post as jest.Mock).mockReturnValue(response);
    });

    test('when all data correct', async () => {
        (axios.post as jest.Mock).mockReturnValue(response);
        const data = await publisherService.create("Alte Literatur");
        expect(JSON.stringify(data)).toEqual(JSON.stringify(response.data));
    });
})


describe("GET api/book/", () => {
    let response;
    beforeEach(() => {
        response = {
            data:
                {
                    "publishers": [
                        {
                            "id": 1,
                            "name": "History"
                        },
                        {
                            "id": 2,
                            "name": "Biography"
                        },
                        {
                            "id": 4,
                            "name": "Science-fiction"
                        },
                        {
                            "id": 5,
                            "name": "Neue Literatur"
                        },
                        {
                            "id": 6,
                            "name": "Alte Literatur"
                        }
                    ]
                }
        };

        (axios.get as jest.Mock).mockReturnValue(response);
    });

    test('when all data correct', async () => {
        (axios.get as jest.Mock).mockReturnValue(response);
        const data = await publisherService.getAll();

        expect(JSON.stringify(response.data)).toEqual(JSON.stringify(data));
    });
})

describe("GET api/book/:id", () => {
    let response;
    beforeEach(() => {
        response = {
            data:
                {
                    "id": 2,
                    "name": "Biography"
                }
        };

        (axios.get as jest.Mock).mockReturnValue(response);
    });

    test('when all data correct', async () => {
        (axios.get as jest.Mock).mockReturnValue(response);
        const data = await publisherService.getOne(2);

        expect(JSON.stringify(data)).toEqual(JSON.stringify(response.data));
    });
})

describe("DELETE api/publisher/delete/:id", () => {
    let response;
    beforeEach(() => {
        response = {
            data: {"publisher": {}}
        };
        (axios.delete as jest.Mock).mockReturnValue(response);
    });

    test('when all data correct', async () => {
        const data = await publisherService.delete(3);
        expect(JSON.stringify(data)).toEqual(JSON.stringify(response.data));
    });
});
