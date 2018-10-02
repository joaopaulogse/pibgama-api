const supertest = require("supertest");
const server = require("../../server");
const apiServer = supertest(server);
global.apiServer = apiServer;
