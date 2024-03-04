import {FormSchema} from "../../../@types";
import {Form, FormProps, Modal} from "antd";
import React, {cloneElement, ReactElement, useReducer, /*useState*/} from "react";
import CreateField from "../../Form/CreateField.tsx";
import { FormInstance, useForm } from "antd/es/form/Form";

export  declare interface FromModalProps extends FormProps {
    formSchema: FormSchema[],
    onOk?: ((dispatch: React.Dispatch<modalActions>, form: FormInstance<any>,e: React.MouseEvent<HTMLButtonElement>)=>void),
    onClose?: ((dispatch: React.Dispatch<modalActions>, form: FormInstance<any>,e: React.MouseEvent<HTMLButtonElement>)=>void),
    button: ReactElement,
    children?: ReactElement
}
export declare type modalActions = 'open' | 'close' | 'loading' | 'loaded'

const modalStates = {
    isOpen: false,
    isLoading: false
}

function reducer (state: typeof modalStates, action:modalActions){
    switch (action){
        case 'open':
            return {...state, isOpen: true}
        case 'close':
            return  {...state, isOpen: false}
        case 'loading':
            return {...state, isLoading: true}
        case 'loaded' :
            return {...state, isLoading: false}
        default:
            return state
    }
}
function FormModal({formSchema, onOk, onClose,button, children,...props}: FromModalProps){
    const [modalReducer , dispatch] = useReducer(reducer, modalStates)
    const form = useForm();
    const modalBtn = cloneElement(button, {
        onClick: ()=>{
            dispatch('open')
        }
    });
    return(
        <>
            {modalBtn}
            <Modal
                open={modalReducer.isOpen}
                confirmLoading={modalReducer.isLoading}
                onOk={(e)=> {
                    if(onOk) onOk(dispatch,form[0],e);
                }}
                onCancel={(e)=>{dispatch('close'); if(onClose)onClose(dispatch, form[0], e);}}
                rootClassName='p-4'
            >
                <Form form={form[0]} {...props} className="mt-10">
                    {formSchema.map((field, i)=>{
                        return (
                            <CreateField  key={field.name+"=-"+i} {...field}></CreateField>
                        )
                    })}
                    {children}
                </Form>
            </Modal>
        </>
    )
}

export default  FormModal