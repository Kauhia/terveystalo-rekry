
export const isPrime = (number: number): boolean => {
    // Wikipedia is your friend
    // Source: https://en.wikipedia.org/wiki/Primality_test#JavaScript
    
    if (number == 2 || number == 3) return true;
    if (number <= 1 || number % 2 == 0 || number % 3 == 0) return false;  
    
    for (let i = 5; i * i <= number ; i+=6)
        if (number % i == 0 || number % (i + 2) == 0) return false;
	
    return true;
}

export const sum = (numbers: number[]): number =>
    numbers.reduce((sum, nextNumber) => sum + nextNumber, 0)
