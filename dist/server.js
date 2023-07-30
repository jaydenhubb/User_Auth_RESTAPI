"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var validateEnvs_1 = require("./utils/validateEnvs");
var mongoose_1 = require("mongoose");
var port = validateEnvs_1["default"].PORT;
mongoose_1["default"].connect(validateEnvs_1["default"].MONGO_URI)
    .then(function () {
    app_1["default"].listen(port, function () {
        console.log('server running on port : ', port, 'and connected to the database');
    });
})["catch"](console.error);
