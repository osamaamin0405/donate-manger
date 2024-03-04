import {body} from "express-validator";

export const CreateCategoryValidate = [
    body('category_name').trim().notEmpty().withMessage("Please enter Category name").isString().withMessage("Not Valid category name"),
    body("category_description").optional().isString().withMessage("not Valid description")
]