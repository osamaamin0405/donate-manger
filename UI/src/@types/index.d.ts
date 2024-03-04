import { Schema } from "yup";
import {
  AutoCompleteProps,
  FormItemProps,
  InputProps,
  UploadProps,
  SelectProps,
  ButtonProps,
  DatePickerProps,
  SwitchProps,
} from "antd";
import { NonIndexRouteObject, RouteObject } from "react-router-dom";
import { MenuItemType } from "antd/es/menu/hooks/useItems";

/*
 *FormSchema Data type for Create Form Component
 *
 *
 */
declare type FormSchema = {
  name: FormItemProps["name"];
  type:
    | string
    | "autoComplete"
    | "upload"
    | "button"
    | "field"
    | "select"
    | "date"
    |"password"
    | "input";
  rules?: Schema;
  fieldProps?: FormItemProps;
  inputProps?: InputProps;
  uploadProp?: UploadProps;
  autoCompleteProps?: AutoCompleteProps;
  selectProps?: SelectProps;
  switchProps?: SwitchProps;
  dateProps?: DatePickerProps;
  buttonProps?: ButtonProps;
};

interface HyperRoute<
  Parm extends MenuItemType & RouteObject = MenuItemType & RouteObject
> extends NonIndexRouteObject,
    MenuItemType {
  children?: Parm[];
}
