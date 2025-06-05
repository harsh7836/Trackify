import express from 'express'

import { userSignUp, userLoginIn, userLogOut } from '../controllers/user.controllers.js';

const userRouter = express.Router();

userRouter.post("/signup", userSignUp);

userRouter.post("/login", userLoginIn);

userRouter.post("/logout", userLogOut);


export default userRouter;

