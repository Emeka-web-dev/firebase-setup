import { Router, Request, Response } from "express";
import userRouter from "../modules/user/user-route";

const appRouter = Router();

appRouter.use(userRouter);

appRouter.get("/", (req: Request, res: Response) => {
  return res.send("Welcome to Play2Learn APIs");
});

export default appRouter;
