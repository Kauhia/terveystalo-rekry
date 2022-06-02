import React, { useState } from "react";
import "./App.css";
import { api, CheckResult, SumCheckResult } from "./api";


const NOT_TESTED = undefined;
type NotTested = typeof NOT_TESTED;

function PrimeTestResult({res}: {res: SumCheckResult | CheckResult}) {
    const message = res.result ?
        `Sum of numbers was ${res.result} and prime check returned ${res.isPrime}` :
        `Prime check returned ${res.isPrime}`
    return <div className="prime-test__result"><p>{message}</p></div>
}

function App() {
    const [numbersString, setNumbersString] = useState<string>("")
    const [checkResult, setCheckResult] = useState<SumCheckResult | CheckResult | NotTested>()
    const [error, setError] = useState<string>("")

    const checkIsPrime = async () => {
        try {
            setError("")
            const numbers = numbersString.split(",").map(parseFloat)
            const response = numbers.length === 1 ?
                await api.getIsPrime(numbers[0]) :
                await api.getSumIsPrime(numbers);

            setCheckResult(response.data)
        } catch (error: any) {
            const er = error?.response?.data?.errorMessage ?? error?.message ?? "Something went wrong"
            setError(er)
            setCheckResult(NOT_TESTED)
        }
    }

    return (
        <div className="App">
            <div className="center-horizontal">
                <div className="center-vertical">
                    <div className="prime-test">
                        <input className="prime-test__input" value={numbersString} onChange={(e) => setNumbersString(e.target.value)} type="text" placeholder="Type in numbers to check if their sum is a prime" />
                        <button className="prime-test__button" onClick={checkIsPrime}>Check</button>
                    </div>
                    {checkResult && <PrimeTestResult res={checkResult}/>}
                    {error && <p className="prime-test__error">{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default App;
