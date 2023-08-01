"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const userModel_1 = __importDefault(require("../model/userModel"));
const mongoose_1 = __importDefault(require("mongoose"));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    const mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
    yield mongoose_1.default.connect(mongoServer.getUri());
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
    yield mongoose_1.default.connection.close();
}));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.create(user);
});
const user = {
    username: 'user1@gmail.com',
    password: "password1"
};
describe("User registeration", () => {
    it("returns 400 status code when signup data is invalid", (done) => {
        (0, supertest_1.default)(app_1.default)
            .post('/api/users/signup')
            .send({
            username: "invalid",
            password: "short"
        })
            .then((response) => {
            expect(response.status).toBe(400);
            done();
        });
    });
    it("returns 400 status code when email already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = {
            username: "existingUser@gmail.com",
            password: "password1"
        };
        yield createUser(existingUser);
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/users/signup')
            .send({
            username: "existingUser@gmail.com",
            password: "password1"
        });
        expect(res.statusCode).toBe(400);
    }));
    it("returns 201 status code when signup is valid", (done) => {
        (0, supertest_1.default)(app_1.default)
            .post('/api/users/signup')
            .send(user)
            .then((response) => {
            expect(response.status).toBe(201);
            done();
        });
    });
    it('saves user to the database', (done) => {
        (0, supertest_1.default)(app_1.default)
            .post('/api/users/signup')
            .send(user)
            .then(() => {
            userModel_1.default.find().then((users => {
                expect(users.length).toBe(1);
                done();
            }));
        });
    });
    it("hashes password before saving", (done) => {
        (0, supertest_1.default)(app_1.default)
            .post('/api/users/signup')
            .send(user)
            .then(() => {
            userModel_1.default.find().then((users => {
                expect(users[0].password).not.toBe("password1");
                done();
            }));
        });
    });
});
describe("User Login", () => {
    it("returns 400 status code when login data is invalid", (done) => {
        (0, supertest_1.default)(app_1.default)
            .post('/api/users/login')
            .send({
            username: "",
            passwod: "password1"
        })
            .then((response) => {
            expect(response.status).toBe(400);
            done();
        });
    });
    it("returns 401 status code when password is incorrect", (done) => {
        const newUser = {
            username: "user@gmail.com",
            password: "password1"
        };
        userModel_1.default.create(newUser);
        (0, supertest_1.default)(app_1.default)
            .post('/api/users/login')
            .send({
            username: "user@gmail.com",
            password: "incorrect1"
        })
            .then((response) => {
            expect(response.status).toBe(401);
            done();
        });
    });
});
