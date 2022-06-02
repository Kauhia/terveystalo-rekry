# Coding assignment
 
Using NodeJS, implement a backend REST API which:
1) Takes multiple integers as input, calculates the sum, and returns the sum including information whether the sum is a prime number or not.
2) Takes one integer as input, and returns information whether the sum is a prime number or not.
3) How would you host this in Azure?
 
Using React / your favorite UI stack implement also a frontend UI page to test the API. User should be able to enter 1-n integers that are sent to API endpoint 1, and single integer that is sent to API endpoint 2.
 
Endpoint 1 could for example (but not necessarily) look like this:
GET http://localhost/myapi/?action=sumandcheck&numbers=1,2,3
-> {"result": 6, "isPrime": false}
 
Endpoint 2 could for example (but not necessarily) look like this:
GET http://localhost/myapi/?action=checkprime&number=89
-> {"isPrime": true}
 
Clear and compact code is appreciated.

## Solution & considerations for part 3

I would host the endpoint in Azure with their virtual machines or refactor the code to use azure functions.

Depending on how demanding calculations could be it might be necessary to add a cache or otherwise store results of long running calculations (memoization or database). Both deployment solutions may timeout on bigger calculations. In this case the code should be factored to be more of a job queue system where user can queue the calculation and later come back to ask if it has completed.