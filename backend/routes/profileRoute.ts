import express from "express";
import { registerUser, getUserProfile } from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware"

const router = express();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get("/profile", protect, getUserProfile);
router.post("/register", registerUser);




export default router;