import express from "express"
const router = express.Router()
import * as UserController from '../controller/userController'
import {protect} from '../middlewares/authMiddleware'


// router. get('/dashboard', protect, UserController.dashboard  )
router.post('/signup', UserController.signUp)
router.post('/login', UserController.login)
export default router 