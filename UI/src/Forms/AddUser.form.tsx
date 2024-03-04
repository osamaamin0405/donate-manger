import { FormSchema } from "../@types";
import * as yup from "yup";
import { gender, userRole } from "../Constance";
import i18next from "i18next";

const t = i18next.t;

const AddUserForm: FormSchema[] = [
    {
        type: "text",
        name: "fname",
        inputProps: { placeholder: t("first name") },
        rules: yup.string()
            .required(t("require validation", {name: t("first name")}))
            .min(2, t("short value", {name: t("first name"), value: 2}))
            .max(20, t("max value", {name: t("first name"), value:20}))
    },
    {
        type: "text",
        name: "lname",
        inputProps: { placeholder: t("last name") },
        rules: yup.string()
            .required(t("last name"))
            .min(2, t("short value", {name: t("last name"), value: 3}))
            .max(50, t("max value", {name: t("last name"), value : 50}))
    },
    {
        type: "tel",
        name: "phone",
        inputProps: { placeholder: t("phone number") },
        rules: yup.string().matches(/(\d+){11}/, t("not valid phone"))
    },
    {
        type: "email",
        name: "email",
        inputProps: { placeholder: t("email") },
        rules: yup.string().required(t("require validation", {name: t("email")})).email(t("not valid email"))
    },
    {
        type: "text",
        name: "username",
        inputProps: { placeholder: t("username") },
        rules: yup.string().typeError(t("not valid value")).optional()
    },
    {
        type: "password",
        name: "password",
        inputProps: { placeholder: t("password") },
        rules: yup.string()
            .required(t("require validation", {name: t("password")}))
            .min(8, t("short value", {name: t("password"), value: 8}))
            .max(56, t("max value", {name: t("password"), value: 56}))
    },
    {
        type: "select",
        name: "gender",
        selectProps: {
            placeholder: t("gender"),
            options: gender,
        },
        rules: yup.number().required(t("require validation", {name: t("gender")})).equals([1,2], t("not valid value"))
    },
    {
        type: 'select',
        name: 'role',
        selectProps: {
            options: userRole,
            placeholder: "User Role"
        }
    },
    {
        name: "files",
        type: "upload",
        fieldProps: {valuePropName: "filelist"},
        inputProps: {placeholder: t("user image")},
        uploadProp: {
            accept: "image/*",
            multiple: false,
            maxCount: 1,
            beforeUpload() {
                return false;
            },
        },
    }
]

export default AddUserForm;