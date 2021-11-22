import { Router } from "express";
import { userRouter } from "./user.routes";
import { videoRouter } from "./video.routes";

const router = Router();

router.use("/videos", videoRouter);
router.use(userRouter);

export { router };
