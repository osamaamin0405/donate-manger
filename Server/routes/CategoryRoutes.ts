import { Router } from "express";
import { auth } from "../middleware/Auth";
import CategoryController from "../Controllers/CategoryController";
import validate from "../middleware/ValidationRuner";
import { CreateCategoryValidate } from "../middleware/CategoryValidation";

const categoryController = new CategoryController();
const categoryRoute = Router();
categoryRoute.put(
    "/category/add",
    [
        auth,
        validate(CreateCategoryValidate),
        categoryController.create.bind(categoryController)
    ]
);

categoryRoute.get("/category/all/:page/:perPage/:col?/:q?", [auth, categoryController.all.bind(categoryController)]);

categoryRoute.get("/category/:id", [auth, categoryController.get.bind(categoryController)]);

categoryRoute.post("/category/edit/:id", [auth, categoryController.edit.bind(categoryController)]);
categoryRoute.delete("/category/delete/:id", [auth, categoryController.delete.bind(categoryController)]);


categoryRoute.get("/donations/statics/:date_from", [auth, categoryController.statics.bind(categoryController)]);


export default categoryRoute;
