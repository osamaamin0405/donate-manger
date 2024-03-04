import { Router } from "express";
import UserController from "../Controllers/UserController";
import validate from "../middleware/ValidationRuner";
import LoginRequestValidation from "../middleware/LoginRequestValidation"
const authRoutes = Router();
const userController = new UserController();

authRoutes.post("/auth/login", [validate(LoginRequestValidation), userController.login.bind(userController)]);


export default authRoutes;
