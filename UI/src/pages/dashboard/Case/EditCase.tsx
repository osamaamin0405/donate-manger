import { Typography, Form, Button, Spin } from "antd";
import { Helmet } from "react-helmet";
import CreateForm from "../../../components/Form/CreateForm";
import CaseForm from "../../../Forms/AddCase.form";
import dayjs from "dayjs";
import {  useNavigate, useParams } from "react-router-dom";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { deleteCase, editCase, getCase } from "../../../api/caseApi";
import useNotification from "antd/es/notification/useNotification";
import useModal from "antd/es/modal/useModal";
import { CreateFormData } from "../../../utils/helpers";
import { useTranslation } from "react-i18next";

const AddCase: React.FC = () => {

    const {id: caseID} = useParams(),
        [userCase, setCase] = useState({
            "_id": "",
            "name": "",
            "national_id": "",
            "phone": "",
            "address": "",
            "dob": "1980-01-01T00:00:00.000Z",
            "marital_status": 1,
            "gender": 1,
            "id_photo": [],
        }),
            [notification, notificationContext] = useNotification(),
            navigate = useNavigate(),
            [modal, modalContext] = useModal(),
            {t} = useTranslation();


        const editCaseSuccsess = (response: any) => {
            notification.destroy();
            notification.success({message: response.message})
        }

        const editCaseRejected = (error: any) => {
            notification.destroy();
            if (error.errors) {
                for (const e in error.errors) {
                    notification.error({message: error.errors[e].msg})
                }
                return;
            }
            notification.error({message: error.message});
        }

        const handelDelete = ()=>{
            modal.confirm({
                title: `Are Sure To Delete ${userCase.name} `,
                onOk(){
                    notification.info({message: 'Please Wait..', icon: <Spin/>});
                    deleteCase((caseID as string))
                        .then(response => {
                            editCaseSuccsess(response.data);
                        }).catch(error => {
                            editCaseRejected(error.response.data);
                        })
                    setTimeout(()=>navigate("/case/all"), 1000)
                }
            })
        }

    useEffect(()=>{
        getCase((caseID as string))
        .then(res=>{
            // console.log(res.data);
            setCase(res.data.data);
        })
        .catch((err)=>{
            notification.error({
                message: err.response.data.message,
            })
            navigate("/error/404")
        });
    },[])

    return (
        <>
            {notificationContext}
            {modalContext}
            <Helmet>
                <title> {t("edit person")} | {userCase.name}</title>
            </Helmet>
            <Typography.Title className="text-center"> {t("edit person")} </Typography.Title>
            {userCase.name && <CreateForm
                initialValues={{
                    gender: userCase.gender,
                    marital_status: userCase.marital_status,
                    dob: dayjs(userCase.dob, "YYYY-MM-DD"),
                    name: userCase.name,
                    national_id: userCase.national_id,
                    address: userCase.address,
                    phone: userCase.phone,
                }}
                onFinish={(values) => {
                    notification.info({message: 'Please Wait..', icon: <Spin/>});
                    values.dob = dayjs(values.dob).format('YYYY-MM-DD');
                    editCase(CreateFormData(values), (caseID as string))
                        .then(response => {
                            editCaseSuccsess(response.data);
                        }).catch(error => {
                            editCaseRejected(error.response.data);
                        })
                }}
                className="grid grid-cols-2 gap-5 "
                formSchema={CaseForm}
            >
                <Form.Item>
                    <Button htmlType="submit" type="primary" block > <EditFilled/> {t("edit")}</Button>
                </Form.Item>
                <Form.Item>
                    <Button 
                        onClick={handelDelete}
                        className="bg-red-900 hover:bg-red-500" type="primary" block > <DeleteFilled/> {t("delete")}</Button>
                </Form.Item>
            </CreateForm> }
        </>
    );
};


export default AddCase;
