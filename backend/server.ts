import express, { Request, Response } from 'express';
import cors from "cors";

import { isString } from './utils';
import { isPrime, sum } from './services';

const app = express();
app.use(cors());
app.use(express.json());


app.get('/api/v1/sumisprime',
    (req: Request, res: Response) => {
        const numbersParams = req.query.numbers
        
        if (!isString(numbersParams)) {
            return res.status(400).json({ errorMessage: "Query parameter format incorrect" })
        }

        const isEmptyArray = numbersParams
            .split(",")
            .filter(val => val !== "")
            .length < 1
        if (isEmptyArray) {
            return res.status(400).json({ errorMessage: "Query parameter must not be empty array" })
        }

        const numbers = numbersParams
            .split(",")
            .map(parseFloat);

        const onlyIntegers = numbers.every(Number.isInteger)
        if (!onlyIntegers) {
            return res.status(400).json({ errorMessage: "Query parameter must include only integers" })
        }

        const sumResult = sum(numbers)
        const primeResult = isPrime(sumResult)
        res.json({ result: sumResult, isPrime: primeResult })
    }
);

app.get('/api/v1/isprime', (req: Request, res: Response) => {
    const numberParam = req.query.number

    if (!isString(numberParam)) {
        return res.status(400).json({ errorMessage: "Query parameter format incorrect" })
    }

    if (numberParam.length < 1) {
        return res.status(400).json({ errorMessage: "Query parameter must not be empty" })
    }

    const number = parseFloat(numberParam)
    if (!Number.isInteger(number)) {
        return res.status(400).json({ errorMessage: "Query parameter must include only integers" })
    }

    res.json({ isPrime: isPrime(number) })
});

export default app;