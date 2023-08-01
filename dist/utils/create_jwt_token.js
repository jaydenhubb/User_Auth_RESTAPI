"use strict";
exports.__esModule = true;
exports.createToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var validateEnvs_1 = require("./validateEnvs");
var createToken = function (id) {
    return jsonwebtoken_1["default"].sign({ id: id }, validateEnvs_1["default"].JWT_SECRET, { expiresIn: "1d" });
};
exports.createToken = createToken;
