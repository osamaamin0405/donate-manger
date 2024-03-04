import { Typography, Form, Button, Spin } from "antd";
import { Helmet } from "react-helmet";
import CreateForm from "../../../components/Form/CreateForm";
import dayjs from "dayjs";
import {  useNavigate, useParams } from "react-router-dom";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import useNotification from "antd/es/notification/useNotification";
import useModal from "antd/es/modal/useModal";
import { AddCategoryForm as categoryForm } from "../../../Forms/AddCategory.form";
import { deleteCategory, editCategory, getCategory } from "../../../api/category";
import { useTranslation } from "react-i18next";

const AddCase: React.FC = () => {

    const {id} = useParams(),
        [category, setCategory] = useState({
            category_name:"",
            description:"",
            show_report_card:true,
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
                title: `Are Sure To Delete ${category.category_name}`,
                onOk(){
                    notification.info({message: 'Please Wait..', icon: <Spin/>});
                    deleteCategory((id as string))
                        .then(response => {
                            editSuccsess(response.data);
                        }).catch(error => {
                            editRejected(error.response.data);
                        })
                    setTimeout(()=>navigate("/category/all"), 1000)
                }
            })
        }

    useEffect(()=>{
        getCategory((id as string))
        .then(res=>{
            // console.log(res.data);
            setCategory(res.data.category);
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
                <title> {t("edit category")} </title>
            </Helmet>
            <Typography.Title className="text-center"> {t("edit category")} </Typography.Title>
            {category.category_name && <CreateForm
                initialValues={{
                    category_name: category.category_name,
                    category_description: category.description,
                    show_card:category.show_report_card,
                }}
                onFinish={(values) => {
                    notification.info({message: 'Please Wait..', icon: <Spin/>});
                    values.dob = dayjs(values.dob).format('YYYY-MM-DD');
                    console.log(values);
                    editCategory((id as string), values)
                        .then(response => {
                            editSuccsess(response.data);
                        }).catch(error => {
                            editRejected(error.response.data);
                        })
                }}
                className="grid grid-cols-2 gap-5 "
                formSchema={categoryForm}
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
