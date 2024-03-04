import { Typography, Form, Button, Spin } from "antd";
import { Helmet } from "react-helmet";
import CreateForm from "../../../components/Form/CreateForm";
import dayjs from "dayjs";
import {  useNavigate, useParams } from "react-router-dom";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import useNotification from "antd/es/notification/useNotification";
import useModal from "antd/es/modal/useModal";
import { deleteDonation, editDonation, getDonation } from "../../../api/Donation";
import { FundForm } from "../../../Forms/Fund.form";
import { useTranslation } from "react-i18next";

const AddCase: React.FC = () => {

    const {id} = useParams(),
        [donation, setDonation] = useState({
            number:null,
            value:"",
            note:"",
            category: {
                _id: "",
                category_name: ""
            },
        }),
            [notification, notificationContext] = useNotification(),
            navigate = useNavigate(),
            [modal, modalContext] = useModal(),
            {t} = useTranslation();

        const editSuccsess = (response: any) => {
            notification.destroy();
            notification.success({message: response.message})
        }

        const editRejected = (error: any) => {
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
                title: `Are Sure To Delete ${donation.number}`,
                onOk(){
                    notification.info({message: 'Please Wait..', icon: <Spin/>});
                    deleteDonation((id as string))
                        .then(response => {
                            editSuccsess(response.data);
                        }).catch(error => {
                            editRejected(error.response.data);
                        })
                    setTimeout(()=>navigate("/donation/all"), 1000)
                }
            })
        }

    useEffect(()=>{
        getDonation((id as string))
        .then(res=>{
            // console.log(res.data);
            setDonation(res.data.donation);
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
                <title>{t("edit donation")}</title>
            </Helmet>
            <Typography.Title className="text-center"> {t("edit donation")} </Typography.Title>
            {donation.number && <CreateForm
                initialValues={{
                    fund_number: donation.number,
                    fund_category: donation.category._id,
                    fund_value: donation.value,
                    fund_note: donation.note != "undefined" ? donation.note :  '',
                }}
                onFinish={(values) => {
                    notification.info({message: 'Please Wait..', icon: <Spin/>});
                    values.dob = dayjs(values.dob).format('YYYY-MM-DD');
                    editDonation((id as string), values)
                        .then(response => {
                            editSuccsess(response.data);
                        }).catch(error => {
                            editRejected(error.response.data);
                        })
                }}
                className="grid grid-cols-2 gap-5 "
                formSchema={FundForm}
            >
                <br/>
                <Form.Item>
                    <Button htmlType="submit" type="primary" block > <EditFilled/> {t("edit")} </Button>
                </Form.Item>
                <Form.Item>
                    <Button 
                        onClick={handelDelete}
                        className="bg-red-900 hover:bg-red-500" type="primary" block > <DeleteFilled/> {t("delete")} </Button>
                </Form.Item>
            </CreateForm> }
        </>
    );
};


export default AddCase;
