const faker = require("faker/locale/pt_BR");
const supertest = require("supertest");
const server = require("../../server");

const apiServer = supertest(server);

const UserService = require("../../src/api/v1/businesses/users/users.service");
const userService = new UserService();

function createObjectUser() {
    return {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        genre: faker.random.arrayElement(["MALE", "FEMALE"]),
    };
}

const createUserAuth = async (userObj = createObjectUser()) => {
    const { body: user } = await apiServer
                .post("/v1/users")
                .send(userObj);
    const password = faker.internet.password(6)
    await apiServer
            .post("/v1/users/pass")
            .send({
                id: user._id,
                password
            });
    const { body: auth } = await apiServer
            .post("/v1/users/auth")
            .send({
                login: user.email,
                password
            });
    return { ...user, token: auth.token };
};

module.exports = {
    createObjectUser,
    createUserAuth,
    userService
};
