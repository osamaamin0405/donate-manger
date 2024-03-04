import {FormSchema} from "../../@types";
import { Form, FormProps} from "antd";
import CreateField from "./CreateField.tsx";
import { ReactNode } from "react";



interface Props extends FormProps{
    formSchema: FormSchema[],
    children?: ReactNode
}
/**
 *CreateForm component used to create form from FormSchema[]
 * @param FormSchema formSchema
 * @param JSX.Element children
 * @param FormProps ..props
 *  @example
 *  <CreateForm formSchema={[{name: 'user_name', type: 'text'}]}/>
 *
 * please make form button always in last element
 */
export default function CreateForm({ formSchema,children,...props}: Props){
    return (
        <Form {...props}>
            {formSchema.map((field, i)=>{
                return (
                    <CreateField  key={field.name+"=-"+i} {...field}></CreateField>
                )
            })}
            {children}
        </Form>
    )
}