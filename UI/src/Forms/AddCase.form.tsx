import i18next from "i18next";
import { FormSchema } from "../@types";
import { gender, maritalStatus } from "../Constance";
import * as yup from "yup";

const t = i18next.t;

const addCase: FormSchema[] = [
  {
    type: "text",
    name: "name",
    inputProps:{placeholder: t("case name")},
    rules: yup.string()
      .required(t('require validation', {name: t("person name")}))
      .min(8, t("short value", {name: t("person name"), value: 8}))
      .max(50, t("max value", {name: t("person name"), value: 50}))
  },
  {
    type: "text",
    name: "national_id",
    inputProps:{placeholder: t("national id")},
    rules: yup.string()
    .required(t('require validation', {name: t("national id")}))
    .matches(/(\d+){14}/, t("not valid id"))
  },
  {
    type: "tel",
    name: "phone",
    inputProps:{placeholder: t("phone number")},
    rules: yup.string()
        .matches(/(\d+){11}/, t("not valid phone"))
  },
  {
    type: "address",
    name: "address",
    inputProps:{placeholder: t("address")},
    rules: yup.string().required(t("require validation", {name: t('address')}))
  },
  {
    type: "date",
    name: "dob",
    dateProps: {
      placeholder: t("dob"),
      className: "w-full",
      format: "YYYY-MM-DD",
      mode: "date",
    },
    rules: yup.date().required(t("require validation", {name: t("dob")})),
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
    name: "marital_status",
    rules: yup.number().required(t("require validation", {name: t("marital status")})).equals([1,2, 3, 4], t("not valid value")),
    selectProps: {
      placeholder: t('marital status'),
      options: maritalStatus,
    },
  },
  {
    type: 'upload',
    name: "files",
    fieldProps: {valuePropName: "filelist"},
    inputProps: {placeholder: t("person docs")},
    uploadProp: {
        accept: "image/*",
        multiple: true,
        maxCount: 3,
        beforeUpload() {
            return false;
        },
    },
  },
] 
// export const dependsFields: FormSchema[] = [
//   {
//     type: "text",
//     name: "relation_name",
//     inputProps: {placeholder: "Relation's name"},
//     fieldProps: {className:"w-[50%]"},
//   },
//   {
//     type: "select",
//     name: "relation_deg",
//     fieldProps: { className:"w-[50%]"},
//     selectProps: {
//       placeholder: "Relation Degre",
//       options: relations,
//     }
//   }
// ]
export default addCase;