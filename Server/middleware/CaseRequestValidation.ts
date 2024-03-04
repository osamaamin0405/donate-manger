import { body } from "express-validator";

const DepensCaseValidate = (values: any) => {
  return values.map((v: any) => {
    if (
      !(v["relation_deg"] as string)
        .trim()
        .match(
          /(father)|(mother)|(son\/daughter)|("brother\/sister")|(wife\/husband)/
        )
    ) {
      throw new Error("Relaton Degree not valid");
    }
    if (!((v["relation_name"] as string).trim().length >= 8)) {
      throw new Error("name is to short");
    }
    return true;
  });
};

const AddcaseRequestValidation = [
  body("name")
    .trim().notEmpty().withMessage("Please Enter Person Name")
    .isLength({ min: 8, max: 50 }).withMessage("Person name must be between 8 - 50"),
  body('national_id')
    .notEmpty().trim().withMessage("Please Enter Natoinal id")
    .isNumeric().withMessage('not valid national id')
    .isLength({min: 14, max:14}).withMessage('national id length not valid'),
  body("phone")
    .trim().notEmpty().withMessage("Please enter phone number")
    .isNumeric().withMessage("not valid phone number").
    isLength({ min: 10, max: 12 }).withMessage("not valid phone number"),
  body("address")
    .trim()
    .notEmpty().withMessage("Please enter address")
    .isLength({min: 4, max: 60 }).withMessage("Addres Not Valid"),
  body("dob")
    .notEmpty().withMessage("Please Enter Date of Birth")
    .withMessage("Plese Enter Date of birth")
    .isDate(
      {format: "YYYY-MM-DD"}
    ).withMessage("Not Valid Date of birth"),
  body("gender")
    .notEmpty().withMessage("Enter Person gender")
    .isNumeric().withMessage("invalid gender. contact admin")
    .matches(/(1|2)/).withMessage("invalid gender. contact admin"),
  body("marital_status")
    .notEmpty().withMessage("Enter marital status")
    .isNumeric().withMessage("Not valid marital status. contact admin")
    .matches(/(1|2|3|4)/).withMessage("not valid marital status. contact admin"),
  // body("names").optional().custom(DepensCaseValidate),
];

export default AddcaseRequestValidation;
