import express from 'express';
import { registerController } from '../controllers/authController.js';
import { loginController } from '../controllers/authController.js';


//router object
const router = express.Router()


//REGISTER || POST
router.post('/register', registerController);


//LOGIN || POST
router.post('/login', loginController);


//export
export default router
