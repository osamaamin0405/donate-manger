import i18next from "i18next";
import { FormSchema } from "../@types";
import { getAllCategory } from "../api/category";
import * as yup from "yup";



const t = i18next.t;

const categories = await(async ()=>{
    const res = await getAllCategory(1, 9999999);
    return res.data.data.map((item:any) => ({ label: item.category_name, value: item._id }));
})()

export const FundForm: FormSchema[] = [
    {
        name: "fund_number",
        type: "number",
        inputProps:{
            placeholder: t("donation number")
        },
        rules: yup.number().typeError(t("not valid value")).required(t("require validation", {name: t("donation number")}))
    },
    {
        name: "fund_category",
        type: "select",
        selectProps: {
            showSearch: true,
            placeholder: t("category name"),
            filterOption: (input, option) => ((option?.label ?? '') as string).includes(input),
            filterSort: (optionA, optionB) =>{
                return ((optionA?.label ?? '') as string).toLowerCase().localeCompare(((optionB?.label ?? '') as string).toLowerCase())
            },
            options: categories,
        },
        rules: yup.string().required(t("require validation", {name: t("category name")}))
    },
    {
        name: "fund_value", //or rules
        type: "text",
        inputProps: {placeholder: t("value")},
        rules: yup.string().required(t("require validation", {name: t('value')}))
    },
    {
        name: "fund_note",
        type: "text",
        inputProps: {placeholder: t("notes")}
    },
    {
        name: "files",
        type: "upload",
        fieldProps: {valuePropName: "filelist"},
        inputProps: {placeholder: t("donation docs")},
        uploadProp: {
            accept: "image/*",
            multiple: true,
            beforeUpload() {
                return false;
            },
        },
        // inputProps: {placeholder: "Fund Notes."}
    },
]

