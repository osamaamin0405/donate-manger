import { Button, Form, Input, Modal, Spin } from "antd";
import { FundForm } from "../../../Forms/Fund.form";
import CreateForm from "../../../components/Form/CreateForm";
import { Navigate, useParams } from "react-router-dom";
import { FaHandHoldingHeart } from "react-icons/fa";
import axios from "axios";
import { CreateFormData } from "../../../utils/helpers";
import useNotification from "antd/es/notification/useNotification";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";


export default function AddFund(){
    const {id} = useParams(),
    [notificationApi , notificationContext] = useNotification(),
    [modal, ModalcontextHolder] = Modal.useModal(),
    [disable, setDisable] = useState(false),
    {t} = useTranslation();

    if(!id) return <Navigate replace to="/error/404" />;
    return (
        <>
            <Helmet>
                <title>{t("add donation")}</title>
            </Helmet>
            {ModalcontextHolder}
            {notificationContext}
            <CreateForm
                formSchema={FundForm}
                initialValues={{
                    case_id: id,
                    fund_number: Math.floor(Math.random() * 1000000)
                }}
                onFinish={(values)=>{
                    if(disable) return;
                    const formData = CreateFormData(values);
                    modal.confirm({
                        title: t("donation confirm"),
                        onOk: ()=>{
                            setDisable(true);
                            notificationApi.info({message: t("pleas wait"), icon: <Spin/>})
                            axios.put("/donation/add", formData)
                            .then(res=>{
                                notificationApi.destroy();
                                notificationApi.success({
                                    message: res.data.message,
                                })
                                
                            }).catch(err=>{
                                console.log(err);
                                notificationApi.destroy();
                                notificationApi.error({
                                    message: err.response.data.message,
                                })
                            }).finally(()=>{
                                setDisable(false);
                            })
                        }
                    })
                }}
                encType="multipart/form-data"
            >
                <Form.Item hidden name='case_id'>
                    <Input name="case_id" disabled />
                </Form.Item>
                <Form.Item>
                    <Button disabled={disable}  block type="primary" htmlType="submit"> {t("give help")} <FaHandHoldingHeart/> </Button>
                </Form.Item>
            </CreateForm>
        </>
    );
}   