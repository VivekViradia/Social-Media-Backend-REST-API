import express from "express";
import { getALlUsers, login, signup } from "../controllers/user-controller";

const router = express.Router()

router.get("/", getALlUsers)
router.post("/signup", signup)
router.post("/login",login)

export default router;