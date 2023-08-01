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
exports.login = exports.signUp = exports.dashboard = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const userModel_1 = __importDefault(require("../model/userModel"));
const create_jwt_token_1 = require("../utils/create_jwt_token");
const bcrypt_1 = __importDefault(require("bcrypt"));
//dashboard route 
const dashboard = (req, res, next) => {
    try {
        const { username } = req.user;
        res.send(`Welcome to your dashboard ${username}!`);
    }
    catch (error) {
        next(error);
    }
};
exports.dashboard = dashboard;
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // validate data
        if (!password || !username) {
            throw (0, http_errors_1.default)(400, 'Please provide username and password');
        }
        if (password.length < 6) {
            throw (0, http_errors_1.default)(400, 'Password must be at least 6 characters');
        }
        // check database iff username already exist exists
        const exists = yield userModel_1.default.findOne({ username }).exec();
        if (exists) {
            throw (0, http_errors_1.default)(400, 'Username already taken');
        }
        // create user
        const user = yield userModel_1.default.create({
            username,
            password
        });
        yield user.save();
        // create token
        const token = (0, create_jwt_token_1.createToken)(user._id);
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite: "none",
            secure: true,
        });
        if (user) {
            const { username } = user;
            res.status(201).json({ Message: `User successfully created` });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.signUp = signUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            throw (0, http_errors_1.default)(400, "Username and password are required");
        }
        const usernameExists = yield userModel_1.default.findOne({ username }).select("+password").exec();
        if (!usernameExists) {
            throw (0, http_errors_1.default)(401, "Invalid credentials");
        }
        const hashedPassword = usernameExists.password != undefined ? yield bcrypt_1.default.compare(password, usernameExists.password) : null;
        if (!hashedPassword) {
            throw (0, http_errors_1.default)(401, "Invalid Credentials");
        }
        const token = (0, create_jwt_token_1.createToken)(usernameExists._id);
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite: "none",
            secure: true,
        });
        res.status(201).json({ Message: `Logged in successfully` });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
