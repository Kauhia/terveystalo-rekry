import { isPrime, sum } from './services';

describe("isPrime service", () => {
    test("number 1 is not a prime", () => {
        expect(isPrime(1)).toEqual(false)
    })

    test("number 0 is not a prime", () => {
        expect(isPrime(1)).toEqual(false)
    })

    test("negative numbers are not primes", () => {
        expect(isPrime(-1)).toEqual(false)
        expect(isPrime(-2)).toEqual(false)
        expect(isPrime(-11)).toEqual(false)
    })

    test("number 7919 is a prime", () => {
        expect(isPrime(7919)).toEqual(true)
    })
})

describe("sum service", () => {
    test("expect negative numbers to work correctly", () => {
        expect(sum([-1, -1])).toEqual(-2)
    })
})