describe("Users CRUD API", () => {
  let userData;

  before(() => {
    cy.generateFixture();

    cy.fixture("data.json").then((fixture) => {
      userData = fixture;
    });
  });

  // post
  it("creates new user", () => {
    cy.postUserRequest(userData.users[0]).then(response => {
      expect(response.status).to.eq(201);

      expect(response.body.email).to.contain(userData.users[0].email);
      expect(response.body.name).to.contain(userData.users[0].name);
      expect(response.body.gender).to.contain(userData.users[0].gender);
      expect(response.body.status).to.contain(userData.users[0].status);
    });
  });

  // get
  it("gets an user", () => {
    cy.getUserRequest().then(([user, response]) => {
      expect(response.status).to.eq(200);

      expect(user.name).to.not.be.empty;
      expect(user.email).to.not.be.empty;
      expect(user.gender).to.not.be.empty;
      expect(user.status).to.not.be.empty;
    });
  });

  // get with params
  it("gets users paginated", () => {
    cy.getUserRequestWithParams("?page=1&per_page=25").then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.length).to.equal(25);
    });
  });

  // put
  it("updates an user", () => {
    cy.getUserRequest().then(([user]) => {
      // properties to update
      const gender = user.gender === "male" ? "female" : user.gender;
      const status = user.status === "active" ? "inactive" : user.status;

      cy.putUserRequest(user.id, user.name, user.email, gender, status).then(response => {
        const updatedUser = response.body;

        expect(response.status).to.eq(200);
        expect(updatedUser.gender).to.eq(gender);
        expect(updatedUser.status).to.eq(status);
      });
    });
  });

  // patch - just an example with the email property
  it('updates email property of an user', () => {
    cy.getUserRequest().then(([user]) => {
      cy.patchUserEmailRequest(user).then(response => {
        const updatedUser = response.body;

        expect(response.status).to.eq(200);
        expect(updatedUser.email).to.not.eq(user.email);
      });
    });
  });

  // delete
  it('deletes an user', () => {
    cy.getUserRequest().then(([user]) => {
      cy.deleteUserRequest(user.id).then(response => {
        expect(response.status).to.eq(204);
      });
    });
  });

  // check unauthorized
  it("receives 401 from the server when auth token is missing", () => {
    cy.postUserRequestWithoutAuthorization(userData.users[1]).then(response => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.contain("Authentication failed");
    });
  });
});
