// src/routes/userRouter.js (or .ts)
import { Router } from 'express';
import { getMyDetails } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';


const userRouter = Router();


userRouter.get("/me",protect,getMyDetails);

export default userRouter;