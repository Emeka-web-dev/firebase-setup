import { Router, Request, Response } from "express";
import { validateFirebaseToken } from "../../middleware/auth";
import { createUser, getUser } from "./user-controller";

const userRouter: Router = Router();

userRouter.post("/users", validateFirebaseToken, createUser);
userRouter.get("/user/:id", validateFirebaseToken, getUser);

export default userRouter;
