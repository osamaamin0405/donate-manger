import { Router } from "express";
import { auth } from "../middleware/Auth";
import UserController from "../Controllers/UserController";


const userRoutes = Router();
const userController = new UserController();


userRoutes.put("/user/create", [auth, userController.create.bind(userController)]);

userRoutes.get('/user/getAuthentcatedUser/', [auth, userController.getAuthUser.bind(userController)]);
userRoutes.get('/user/get/:id', [auth, userController.get.bind(userController)]);

userRoutes.get('/user/all/:page/:perPage/:coloumn?/:q?', [auth, userController.all.bind(userController)]);
userRoutes.post("/user/edit/:id", [auth, userController.update.bind(userController)]);
userRoutes.delete("/user/delete/:id", [auth, userController.delete.bind(userController)]);

// userRoutes.get("/user/info/:id", [auth, userController.allInfo.bind(userController)]);


export default userRoutes;
