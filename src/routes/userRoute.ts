import express from "express"
const router = express.Router()
import * as UserController from '../controller/userController'


//router.get('/home', UserControllerr.home)
router.post('/signup', UserController.signUp)
//router.post('/login', UserController.login)