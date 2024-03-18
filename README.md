# quatt-assignment

Cypress E2E tests for the [User Test API](https://gorest.co.in), as part of the Quatt assessment.

[Requirements](#requierements)<br>
[Test Cases](#test-cases)<br>
[Running](#running)<br>

## Requirements:

Create e2e test scenarios for the CRUD user operations with API Version 2 and HTTP Bearer Token authentication from https://gorest.co.in/ service. 
Use JavaScript and a framework of your choice.

## Test Cases

1. **Creates new user**
2. **Gets a random user and asserts not null**
3. **Gets users with params**
4. **Updates a user's gender and status using PUT**
5. **Updates a user's email using PATCH**
6. **Deletes a random user**
7. **Checks failure if Bearer token is missing**

## Running

The test cases are automated with [Cypress](https://github.com/cypress-io/cypress).
To run them locally, first install the needed dependencies:

```npm install``` 

Then, to open the cypress interface run:

```npx cypress open --e2e```

and select a preferred browser. Open the ```tests.cy.js``` file.

To run them headless, use 
```npx cypress run --e2e```
