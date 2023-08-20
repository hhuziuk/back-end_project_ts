import {jest} from '@jest/globals';
import 'reflect-metadata';
import {PostgresDataSource} from "../utils/connect";
import axios from "axios";
import publisherService from "../services/publisher-service";
import typeService from "../services/type-service";
require("dotenv").config();

jest.mock('axios')

beforeEach(async () => {
    await PostgresDataSource.initialize()
});
afterEach(async () => {
    await PostgresDataSource.destroy()
});

describe("POST api/type/add", () => {
    let response;
    beforeEach(() => {
        response = {
            data:
                {
                    "name": "PIIG",
                    "id": 11
                }
        };

        (axios.post as jest.Mock).mockReturnValue(response);
    });

    test('when all data correct', async () => {
        (axios.post as jest.Mock).mockReturnValue(response);
        const data = await typeService.create("PIIG");
        expect(JSON.stringify(data)).toEqual(JSON.stringify(response.data));
    });
})


describe("GET api/book/", () => {
    let response;
    beforeEach(() => {
        response = {
            data: [
                {
                    "id": 4,
                    "name": "DTI"
                },
                {
                    "id": 5,
                    "name": "Mass Market Paperback"
                },
                {
                    "id": 6,
                    "name": "Prosvita"
                },
                {
                    "id": 7,
                    "name": "Alte Literatur"
                },
                {
                    "id": 8,
                    "name": "Altee Literatur"
                },
                {
                    "id": 9,
                    "name": "PUG"
                },
                {
                    "id": 10,
                    "name": "PIG"
                },
                {
                    "id": 11,
                    "name": "PIIG"
                }
            ]
        };

        (axios.get as jest.Mock).mockReturnValue(response);
    });

    test('when all data correct', async () => {
        (axios.get as jest.Mock).mockReturnValue(response);
        const data = await typeService.getAll();

        expect(response.data).toEqual(data);
    });
})

describe("GET api/book/:id", () => {
    let response;
    beforeEach(() => {
        response = {
            data:
                {
                    "id": 10,
                    "name": "PIG"
                }
        };

        (axios.get as jest.Mock).mockReturnValue(response);
    });

    test('when all data correct', async () => {
        (axios.get as jest.Mock).mockReturnValue(response);
        const data = await typeService.getOne(10);

        expect(JSON.stringify(data)).toEqual(JSON.stringify(response.data));
    });
})

describe("DELETE api/publisher/delete/:id", () => {
    let response;
    beforeEach(() => {
        response = {
            data: {"type": {}}
        };
        (axios.delete as jest.Mock).mockReturnValue(response);
    });

    test('when all data correct', async () => {
        const data = await typeService.delete(3);
        expect(JSON.stringify(data)).toEqual(JSON.stringify(response.data));
    });
});
