
import request from "supertest";
import app from "./server"

describe("GET /sumisprime endpoint", () => {
    test("returns correct sum and prime test result", async () => {
        const res = await request(app)
            .get('/api/v1/sumisprime/?numbers=1,2,3')
        
        expect(res.statusCode).toEqual(200)
        expect(res.body.result).toEqual(6)
        expect(res.body.isPrime).toEqual(false)
    })

    test("returns correctly when array has only one number", async () => {
        const res = await request(app)
            .get('/api/v1/sumisprime/?numbers=3')

        expect(res.body.result).toEqual(3)
        expect(res.body.isPrime).toEqual(true)
    })

    test("works with big values", async () => {
        // this test might not be enough
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
        const res = await request(app)
            .get('/api/v1/sumisprime/?numbers=1000000000000000000000000000000000000000000000000000000000000000000000000000000000000001,1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000')

        expect(res.body.result).toEqual(1000000000000000000000000000000000000000000000000000000000000000000000000000000000000001 + 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000)
        expect(res.body.isPrime).toEqual(false)
    })
    
    test("errors with empty array", async () => {
        const res = await request(app)
            .get('/api/v1/sumisprime/?numbers=')

        expect(res.statusCode).toEqual(400)
        expect(res.body.errorMessage).toEqual("Query parameter must not be empty array")
    })

    test("errors with non numeric value in array", async () => {
        const res = await request(app)
            .get('/api/v1/sumisprime/?numbers=1,2,e')

        expect(res.statusCode).toEqual(400)
        expect(res.body.errorMessage).toEqual("Query parameter must include only integers")
    })

    test("errors with float value in array", async () => {
        const res = await request(app)
            .get('/api/v1/sumisprime/?numbers=1,2,1.2')
        
        expect(res.statusCode).toEqual(400)
        expect(res.body.errorMessage).toEqual("Query parameter must include only integers")
    })
})

describe("GET /isprime endpoint", () => {
    test("returns correctly for correct input number", async () => {
        const res = await request(app)
            .get('/api/v1/isprime/?number=9')
        
        expect(res.body.isPrime).toEqual(false)
    })
    test("errors on empty input", async () => {
        const res = await request(app)
            .get('/api/v1/isprime/?number=')
        
        expect(res.statusCode).toEqual(400)
        expect(res.body.errorMessage).toEqual("Query parameter must not be empty")
    })
    test("errors on non number input", async () => {
        const res = await request(app)
            .get('/api/v1/isprime/?number=e')
        
        expect(res.statusCode).toEqual(400)
        expect(res.body.errorMessage).toEqual("Query parameter must include only integers")
    })
    test("errors on float input", async () => {
        const res = await request(app)
            .get('/api/v1/isprime/?number=1.1')
        
        expect(res.statusCode).toEqual(400)
        expect(res.body.errorMessage).toEqual("Query parameter must include only integers")
    })
})