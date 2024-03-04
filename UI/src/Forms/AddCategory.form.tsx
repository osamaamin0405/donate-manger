import i18next from "i18next";
import { FormSchema } from "../@types";
import * as yup from "yup";

const t = i18next.t;

const AddCategoryForm: FormSchema[] = [
    {
        name: "category_name",
        type: "text",
        inputProps: {placeholder: t("category name")},
        rules: yup.string().required(t("require validation", {name: t("category name")}))
    },
    {
        name: "category_description",
        type: "text",
        inputProps: {placeholder: t("category description")}
    },
    {
        name: "show_card",
        type: "switch",
        fieldProps: {label: t("show report"), valuePropName: "checked", initialValue: true,},
        switchProps: {checked: true, defaultChecked: true}
    }
    // {
    //     name: "category_type", //or rules
    //     type: "select",
    //     selectProps: {
    //         options: [],
    //         placeholder: "Category Type"
    //     },
    // }
]

export {AddCategoryForm};