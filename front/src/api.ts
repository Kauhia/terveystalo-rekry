import axios from "axios"

const endpoint = axios.create({ baseURL: "http://localhost:8000/api/v1"})

export type SumCheckResult = { result: number, isPrime: boolean }
export type CheckResult = { result: number, isPrime: boolean }

const getSumIsPrime = (numbers: number[]) => {
    const conf = { params: { numbers: numbers.join(",")} };
    return endpoint.get<SumCheckResult>("/sumisprime", conf)
}

const getIsPrime = (number: number) => {
    const conf = { params: { number } };
    return endpoint.get<CheckResult>("/isprime", conf)
}

export const api = {
    getSumIsPrime,
    getIsPrime
}