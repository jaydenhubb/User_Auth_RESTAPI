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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.login = exports.signUp = exports.dashboard = void 0;
var http_errors_1 = require("http-errors");
var userModel_1 = require("../model/userModel");
var create_jwt_token_1 = require("../utils/create_jwt_token");
var bcrypt_1 = require("bcrypt");
//dashboard route 
var dashboard = function (req, res, next) {
    try {
        var username = req.user.username;
        res.send("Welcome to your dashboard ".concat(username, "!"));
    }
    catch (error) {
        next(error);
    }
};
exports.dashboard = dashboard;
var signUp = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, exists, user, token, username_1, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                // validate data
                if (!password || !username) {
                    throw (0, http_errors_1["default"])(400, 'Please provide username and password');
                }
                if (password.length < 6) {
                    throw (0, http_errors_1["default"])(400, 'Password must be at least 6 characters');
                }
                return [4 /*yield*/, userModel_1["default"].findOne({ username: username }).exec()];
            case 2:
                exists = _b.sent();
                if (exists) {
                    throw (0, http_errors_1["default"])(400, 'Username already taken');
                }
                return [4 /*yield*/, userModel_1["default"].create({
                        username: username,
                        password: password
                    })];
            case 3:
                user = _b.sent();
                return [4 /*yield*/, user.save()
                    // create token
                ];
            case 4:
                _b.sent();
                token = (0, create_jwt_token_1.createToken)(user._id);
                res.cookie("token", token, {
                    path: "/",
                    httpOnly: true,
                    expires: new Date(Date.now() + 1000 * 86400),
                    sameSite: "none",
                    secure: true
                });
                if (user) {
                    username_1 = user.username;
                    res.status(201).json({ Message: "User successfully created" });
                }
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                next(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.signUp = signUp;
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, usernameExists, hashedPassword, _b, token, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                if (!username || !password) {
                    throw (0, http_errors_1["default"])(400, "Username and password are required");
                }
                return [4 /*yield*/, userModel_1["default"].findOne({ username: username }).select("+password").exec()];
            case 2:
                usernameExists = _c.sent();
                if (!usernameExists) {
                    throw (0, http_errors_1["default"])(401, "Invalid credentials");
                }
                if (!(usernameExists.password != undefined)) return [3 /*break*/, 4];
                return [4 /*yield*/, bcrypt_1["default"].compare(password, usernameExists.password)];
            case 3:
                _b = _c.sent();
                return [3 /*break*/, 5];
            case 4:
                _b = null;
                _c.label = 5;
            case 5:
                hashedPassword = _b;
                if (!hashedPassword) {
                    throw (0, http_errors_1["default"])(401, "Invalid Credentials");
                }
                token = (0, create_jwt_token_1.createToken)(usernameExists._id);
                res.cookie("token", token, {
                    path: "/",
                    httpOnly: true,
                    expires: new Date(Date.now() + 1000 * 86400),
                    sameSite: "none",
                    secure: true
                });
                res.status(201).json({ Message: "Logged in successfully" });
                return [3 /*break*/, 7];
            case 6:
                error_2 = _c.sent();
                next(error_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
