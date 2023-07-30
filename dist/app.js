"use strict";
exports.__esModule = true;
require("dotenv/config");
var express_1 = require("express");
var cors_1 = require("cors");
var cookie_parser_1 = require("cookie-parser");
var errorMiddleware_1 = require("./middlewares/errorMiddleware");
var userRoute_1 = require("./routes/userRoute");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: false }));
app.use((0, cookie_parser_1["default"])());
app.use((0, cors_1["default"])({
    origin: 'https://justjustin.stoplight.io',
    credentials: true
}));
app.get('/api/home', function (req, res) {
    res.send("Welcome to my page!");
});
app.use('/api/users', userRoute_1["default"]);
app.use(errorMiddleware_1["default"]);
exports["default"] = app;
