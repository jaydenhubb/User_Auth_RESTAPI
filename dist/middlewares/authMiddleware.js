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
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
const http_errors_1 = __importDefault(require("http-errors"));
const validateEnvs_1 = __importDefault(require("../utils/validateEnvs"));
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw (0, http_errors_1.default)(401, "Unauthorized! Please log in.");
        }
        const verified = jsonwebtoken_1.default.verify(token, validateEnvs_1.default.JWT_SECRET);
        const user = yield userModel_1.default.findById(verified.id).select("-password");
        if (!user) {
            throw (0, http_errors_1.default)(404, "User not found");
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.protect = protect;
