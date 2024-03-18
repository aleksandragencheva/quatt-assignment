import { faker } from '@faker-js/faker';

Cypress.Commands.add('generateFixture', () => {
  const status = [
    "active",
    "inactive"
  ];

  // to clear the file first
  cy.writeFile("cypress/fixtures/data.json", "");

  // generate users
  cy.writeFile('cypress/fixtures/data.json', {
    "users": Cypress._.times(10, () => {
      return {
        "name": `${faker.person.fullName()}`,
        "email": `${faker.internet.email()}`,
        "gender": `${faker.person.sex()}`,
        "status": status[Math.floor(Math.random()*2)]
      }
    })
  });
})

// returns random user, together with the response
Cypress.Commands.add("getUserRequest", () => {
  cy.request({
    method: "GET",
    url: `/public/v2/users`
  }).then(response => {
    const randomUser = response.body[Math.floor(Math.random()*response.body.length)];
    return [randomUser, response];
  })
});

Cypress.Commands.add("getUserRequestWithParams", (params) => {
  cy.request({
    method: "GET",
    url: `/public/v2/users${params}`
  });
});

Cypress.Commands.add("postUserRequest", (user) => {
  cy.request({
    method: "POST",
    url: "/public/v2/users",
    failOnStatusCode: false,
    headers: {
      "Authorization": "Bearer " + Cypress.env("access_token")
    },
    body:{
      "name": user.name,
      "email": user.email,
      "gender": user.gender,
      "status": user.status
    }
  });
});

Cypress.Commands.add("putUserRequest", (userId, name, email, gender, status) => {
  cy.request({
    method: "PUT",
    url: `/public/v2/users/${userId}`,
    headers: {
      "Authorization": "Bearer " + Cypress.env("access_token")
    },
    body: {
      "name": name,
      "email": email,
      "gender": gender,
      "status": status
    }
  });
});

Cypress.Commands.add("patchUserEmailRequest", (user) => {
  cy.request({
    method: "PATCH",
    url: `/public/v2/users/${user.id}`,
    headers: {
      "Authorization": "Bearer " + Cypress.env("access_token")
    },
    body: {
      "email": `${faker.internet.email()}`
    }
  });
});

Cypress.Commands.add("deleteUserRequest", (userId) => {
  cy.request({
    method: "DELETE",
    url: `/public/v2/users/${userId}`,
    headers: {
      "Authorization": "Bearer " + Cypress.env("access_token")
    }
  });
});

Cypress.Commands.add("postUserRequestWithoutAuthorization", (user) => {
  cy.request({
    method: "POST",
    url: "/public/v2/users",
    failOnStatusCode: false,
    body:{
      "name": user.name,
      "email": user.email,
      "gender": user.gender,
      "status": user.status
    }
  });
});

/** Unused, but an alternative to creating new users in the seed file (data.json) everytime;
 *  Restricted by the 'GET' user request which only returns 10 users;
 *  Would be unefficiant to loop through all the pages
 */
Cypress.Commands.add("cleanUpData", () => {
  cy.fixture("data.json").then((userData) => {
    cy.getUserRequest().then((response) => {
      const usersToDelete = response.body.filter(user => user.email === userData.user1.email);
  
      if (usersToDelete.length === 0) {
        return;
      }
  
      for (const user of usersToDelete) {
        cy.deleteUserRequest(user.id);
      }
    });
  });
});
