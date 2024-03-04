import { Button, Modal, Spin, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom"
import CreateForm from "../../../components/Form/CreateForm";
import CreateField from "../../../components/Form/CreateField";
import { FormSchema } from "../../../@types";
import * as yup from "yup";
import { CreateFormData } from "../../../utils/helpers";
import axios from "axios";
import useNotification from "antd/es/notification/useNotification";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const formSchema: FormSchema[] = [
    {
        name: "case_name",
        type: "text",
        
        inputProps: {disabled:true, placeholder: "Case Name"},
    },
    {
        name: "fund_value",
        type: "text",
        inputProps: {placeholder: "Donation Value"},
        rules: yup.string().required("Please enter Donation values"),
    },
    {
        name: "fund_note",
        type: "text",
        inputProps: {placeholder: "Donation Note or Reason."},
        rules: yup.string().optional(),
    }
]


export default function DonationReview(){

    const {rowSelectedData, formValues} = useLocation().state,
            [notificationApi , notificationContext] = useNotification(),
            navigate = useNavigate(),
            [modal, ModalcontextHolder] = Modal.useModal(),
            [disable, setDisable] = useState(false),
            {t} = useTranslation();

    function onFinish(values: any): void {
        if(disable) return;
        const data = [];
        for(const id in values){
            data.push({
                id: id,
                value: values[id].fund_value,
                note: values[id].fund_note,
            })
        }

        const formData = CreateFormData(formValues);
        formData.append("data", JSON.stringify(data));
            modal.confirm({
                title: t("list donation confirm", {length: data.length}),
                okText: t("ok"),
                cancelText: t("cancle"),
                onOk: ()=>{
                    setDisable(true);
                    notificationApi.info({
                        icon: <Spin/>,
                        message: t("please wait"),
                        duration: 0,
                    })
                    axios.put("/donation/collection/add", formData)
                    .then(res=>{
                        notificationApi.destroy();
                        notificationApi.success({
                            message: res.data.message,
                            description: t("redirect", {sec: 2})
                        })
                        setTimeout(()=>{
                            navigate("/case/all", {
                                replace: true,
                            });
                        }, 3000)
                    }).catch(err=>{
                        setDisable(false);
                        notificationApi.destroy();
                        notificationApi.error({
                            message: err.response.data.message,
                        })
                    })
                }
            })
    }

    return (
        <>
            <Helmet>
                <title>{t("review list")}</title>
            </Helmet>
            {notificationContext}
            {ModalcontextHolder}
            <Typography.Title>{t("review list")}</Typography.Title>

            <CreateForm onFinish={(values)=>onFinish(values)} formSchema={[]}>
                {rowSelectedData.map((rowData:any)=>{
                    return (
                        <div key={rowData._id} className="flex gap-4 w-full justify-center flex-grow-1" >
                            <CreateField {...formSchema[0]} fieldProps={{initialValue: rowData.name, className: "flex-1"}} name={[rowData._id, formSchema[0].name]}/>
                            <CreateField {...formSchema[1]} fieldProps={{initialValue: formValues.fund_value, className: "flex-1"}} name={[rowData._id, formSchema[1].name]}/>
                            <CreateField {...formSchema[2]} fieldProps={{initialValue: formValues.fund_note, className: "flex-1"}} name={[rowData._id, formSchema[2].name]}/>
                        </div>
                    )
                })}
                <Button disabled={disable} htmlType="submit" type="primary" block>{t("give help")}</Button>
            </CreateForm>

        </>
    )

}