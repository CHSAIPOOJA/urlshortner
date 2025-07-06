import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { RouterredirectFunction, shortUrl } from "../controllers/shortUrlController.js";

const shortURLRouter = Router();

shortURLRouter.post("",protect,shortUrl);
shortURLRouter.get("/:shortCode", RouterredirectFunction);

export default shortURLRouter;
