import { Router } from "express";
import userRouter from "./user.route.js";
import videoRouter from "./video.route.js";
import subscriptionRouter from "./subscriptions.route.js";
import commentRouter from "./comment.route.js";


const router = Router();

router
  .use(`/user`, userRouter)
  .use(`/comment`, commentRouter)
  .use(`/video`, videoRouter)
  .use(`/sbc`, subscriptionRouter);
export default router;
