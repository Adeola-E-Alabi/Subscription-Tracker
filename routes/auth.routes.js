import {Router} from 'express'
import { signIn, signUp,signOut } from '../Controllers/auth.controller.js';

const authRouter = Router();

authRouter.post( '/sign-Up', signUp)
authRouter.post( '/sign-In', signIn)
authRouter.post( '/sign-Out', signOut)

export default authRouter