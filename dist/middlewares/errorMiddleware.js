"use strict";
exports.__esModule = true;
var http_errors_1 = require("http-errors");
var errorHandler = function (error, req, res, next) {
    var errorMessage = "An unknown error occured";
    var statusCode = 500;
    if ((0, http_errors_1.isHttpError)(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    if (error instanceof Error)
        errorMessage = error.message;
    res.status(statusCode).json({ error: errorMessage });
};
exports["default"] = errorHandler;
