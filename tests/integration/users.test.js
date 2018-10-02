const HttpStatus = require("http-status");
const HelperUser = require("../helpers/users.helper");
const faker = require("faker/locale/pt_BR");

describe("Users", () => {
    describe("Users Endpoints", () => {
        let user;
        it("POST Create user", async () => {
            const { body } = await apiServer
                .post("/v1/users")
                .send(HelperUser.createObjectUser());
            expect(body).toHaveProperty("_id");
            expect(body).toHaveProperty("email");
            expect(body).not.toHaveProperty("password");
            user = body;
        });

        it("POST Create user password", async () => {
            const { body } = await apiServer
                .post("/v1/users/pass")
                .send({
                    id: user._id,
                    password: "12345678"
                });
            expect(body).toHaveProperty("status");
            expect(body.status).toEqual("success");
        });

        it("POST Create user password not authorized", async () => {
            const { body, status } = await apiServer
                .post("/v1/users/pass")
                .send({
                    id: user._id,
                    password: "12345678"
                });
            expect(status).toEqual(HttpStatus.UNAUTHORIZED);
            expect(body).toHaveProperty("status");
            expect(body.status).toEqual("error");
            expect(body.code).toEqual("001");
        });

        it("POST Authentication", async () => {
            const { body, status } = await apiServer
                .post("/v1/users/auth")
                .send({
                    login: user.email,
                    password: "12345678"
                });
            expect(status).toEqual(HttpStatus.OK);
            expect(body).toHaveProperty("token");
        });

        afterAll(async () => {
            await HelperUser.userService._remove({});
        });
    });

    describe("Users updates", () => {
        let user;
        beforeAll(async()=>{
            user = await HelperUser.createUserAuth();
        })
        it("Update", async()=>{
            const { body } = await apiServer
                .put(`/v1/users/${user._id}`)
                .set("x-access-token", user.token)
                .send({
                    username: faker.internet.userName(),
                    birthdate: faker.date.past().toISOString(),
                    location: {
                        lng:faker.address.longitude(),
                        lat:faker.address.latitude()
                    },
                    baptized: true
                });
            expect(body).toHaveProperty("username");
            expect(body).toHaveProperty("birthdate");
            expect(body).toHaveProperty("location");
            expect(body).toHaveProperty("baptized");
        });
        afterAll(async () => {
            await HelperUser.userService._remove({});
        });
    });
});
