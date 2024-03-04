import {body} from "express-validator"


const LoginRequestValidation = [
    body('username')
        .notEmpty().withMessage("Username is Required").isLength({min: 4, max:50}).withMessage("username lenght between 8 and 50"),
    body('password')
        .notEmpty().withMessage("PleaseEnterPassword").isString().withMessage("Not Valid Password")
        .isLength({min: 8, max: 50}).withMessage("password must between 8 and 50 character")
]

export default LoginRequestValidation;