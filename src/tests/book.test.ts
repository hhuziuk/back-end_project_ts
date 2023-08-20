import {jest} from '@jest/globals';
import 'reflect-metadata';
import bookService from '../services/book-service'
import {PostgresDataSource} from "../utils/connect";
import axios from "axios";
import publisherService from "../services/publisher-service";
require("dotenv").config();

jest.mock('axios')

beforeEach(async () => {
    await PostgresDataSource.initialize()
});
afterEach(async () => {
    await PostgresDataSource.destroy()
});


describe("POST api/book/add", () => {
    let response;
    beforeEach(() => {
        response = {
            data: [
                {
                            BookDto: {
                                "name": "1984",
                                "author": "Orewell",
                                "description": "sdfsdfsdfx",
                                "file": "96ed4b63-15b0-4b7c-99f3-61e8e15cd5e5.pdf",
                                "ISBN": "9783125739291",
                                "typeId": 5,
                                "publisherId": 3
                            }
                },
            ],
        };

        (axios.post as jest.Mock).mockReturnValue(response);
    });

    test('when all data correct', async () => {
        (axios.post as jest.Mock).mockReturnValue(response);
        const data = await bookService.create(
            "1984",
            "Orewell",
            "sdfsdfsdfx",
            "96ed4b63-15b0-4b7c-99f3-61e8e15cd5e5.pdf",
            '9783125739291',
            5,
            3
        );
        expect(JSON.stringify(data.BookDto)).toEqual(JSON.stringify(response.data[0].BookDto));
    });
})

describe("GET api/book/", () => {
        let response;
    beforeEach(() => {
        response = {
            data: [
                {
                    books: [
                        [
                            {
                                "ISBN": "9780451526342",
                                "author": "George Orwell",
                                "description": "75th Anniversary Edition—Includes a New Introduction by Téa Obreht",
                                "file": "d5aea02c-163e-4365-a575-c2ebc57a2e40.pdf",
                                "id": 2,
                                "name": "Animal Farm",
                                "publisherId": 3,
                                "typeId": 5
                            },
                            {
                                "ISBN": "3936522359",
                                "author": "fsdfsd dfsdf",
                                "description": "sdfsdfsdf",
                                "file": "1bee3887-a36f-40b2-bfcd-1f65d8564506.pdf",
                                "id": 3,
                                "name": "adsadс  сс",
                                "publisherId": 3,
                                "typeId": 5
                            },
                            {
                                "ISBN": "9780198185215",
                                "author": "Orewell",
                                "description": "sdfsdfsdfx",
                                "file": "96ed4b63-15b0-4b7c-99f3-61e8e15cd5e5.pdf",
                                "id": 4,
                                "name": "1984",
                                "publisherId": 3,
                                "typeId": 5
                            },
                            {
                                "ISBN": "9783843701419",
                                "author": "Orewell",
                                "description": "sdfsdfsdfx",
                                "file": "96ed4b63-15b0-4b7c-99f3-61e8e15cd5e5.pdf",
                                "id": 5,
                                "name": "1984",
                                "publisherId": 3,
                                "typeId": 5
                            },
                            {
                                "ISBN": "9783103900095",
                                "author": "Orewell",
                                "description": "sdfsdfsdfx",
                                "file": "96ed4b63-15b0-4b7c-99f3-61e8e15cd5e5.pdf",
                                "id": 6,
                                "name": "1984",
                                "publisherId": 3,
                                "typeId": 5
                            },
                            {
                                "ISBN": "9780141187358",
                                "author": "Orewell",
                                "description": "sdfsdfsdfx",
                                "file": "96ed4b63-15b0-4b7c-99f3-61e8e15cd5e5.pdf",
                                "id": 7,
                                "name": "1984",
                                "publisherId": 3,
                                "typeId": 5
                            },
                            {
                                "ISBN": "9781328869333",
                                "author": "Orewell",
                                "description": "sdfsdfsdfx",
                                "file": "96ed4b63-15b0-4b7c-99f3-61e8e15cd5e5.pdf",
                                "id": 8,
                                "name": "1984",
                                "publisherId": 3,
                                "typeId": 5
                            },
                            {
                                "ISBN": "9783125739291",
                                "author": "Orewell",
                                "description": "sdfsdfsdfx",
                                "file": "96ed4b63-15b0-4b7c-99f3-61e8e15cd5e5.pdf",
                                "id": 9,
                                "name": "1984",
                                "publisherId": 3,
                                "typeId": 5
                            }
                        ]
                    ],
                },
            ],
        };

        (axios.get as jest.Mock).mockReturnValue(response);
    });

    test('when all data correct', async () => {
        (axios.get as jest.Mock).mockReturnValue(response);
        const data = await bookService.getAll();

        expect(response.data[0].books).toEqual(data.books);
    });
})



describe("GET api/book/:id", () => {
    let response;
    beforeEach(() => {
        response = {
            data: {
                "id": 6,
                "name": "1984",
                "author": "Orewell",
                "description": "sdfsdfsdfx",
                "file": "96ed4b63-15b0-4b7c-99f3-61e8e15cd5e5.pdf",
                "ISBN": "9783103900095",
                "typeId": 5,
                "publisherId": 3
            }
        };

        (axios.get as jest.Mock).mockReturnValue(response);
    });

    test('when all data correct', async () => {
        (axios.get as jest.Mock).mockReturnValue(response);
        const data = await bookService.getOne(6)
        expect(JSON.stringify(data)).toEqual(JSON.stringify(response.data));


    });

})


describe("DELETE api/book/delete/:id", () => {
    let response;
    beforeEach(() => {
        response = {
            data: {}
        };
        jest.spyOn(bookService, 'delete').mockResolvedValue(response);
    });

    test('when all data correct', async () => {
        const data = await bookService.delete(3);
        expect(data).toEqual(response);
    });
});










