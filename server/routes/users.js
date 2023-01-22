import express from "express";
import { login, signup } from "../controlers/auth.js";
import { getAllUsers } from "../controlers/Users.js";

const router=express.Router();
router.post('/signup',signup);
router.post('/login',login);

router.get('/getAllUsers',getAllUsers)

export default router;