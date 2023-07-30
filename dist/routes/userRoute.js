"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var UserController = require("../controller/userController");
var authMiddleware_1 = require("../middlewares/authMiddleware");
router.get('/dashboard', authMiddleware_1.protect, UserController.dashboard);
router.post('/signup', UserController.signUp);
router.post('/login', UserController.login);
exports["default"] = router;
