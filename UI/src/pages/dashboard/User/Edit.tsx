import { Typography, Form, Button, Spin } from "antd";
import { Helmet } from "react-helmet";
import CreateForm from "../../../components/Form/CreateForm";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import useNotification from "antd/es/notification/useNotification";
import useModal from "antd/es/modal/useModal";
import { getUser, editUser, deleteUser } from "../../../api/user";
import userForm from "../../../Forms/AddUser.form";
import { useSelector } from "react-redux";
import { userSelector } from "../../../store";
import { CreateFormData } from "../../../utils/helpers";
import { useTranslation } from "react-i18next";

//clear password validating rules to skip change password;
userForm[5].rules = undefined;

const AddCase: React.FC = () => {

    const { id: userID } = useParams(),
        user = useSelector(userSelector),
        newID = userID == 'me' ? user._id : userID,
        [editableUser, setEditUser] = useState({
            "_id": "",
            "fname": "",
            "lname": "",
            "username": "",
            "email": "",
            "phone": "",
            "gender": 1,
            "image": "",
            "password": "",
            "role": 1,
        }),
        [notification, notificationContext] = useNotification(),
        navigate = useNavigate(),
        [modal, modalContext] = useModal(),
        {t} = useTranslation();


    const editSuccsess = (response: any) => {
        notification.destroy();
        notification.success({ message: response.message })
    }

    const editRejected = (error: any) => {
        notification.destroy();
        if (error.errors) {
            for (const e in error.errors) {
                notification.error({ message: error.errors[e].msg })
            }
            return;
        }
        notification.error({ message: error.message });
    }

    const handelDelete = () => {
        modal.confirm({
            title: `Are Sure To Delete ${editableUser.username}`,
            onOk() {
                notification.info({ message: 'Please Wait..', icon: <Spin /> });
                deleteUser((userID as string))
                    .then(response => {
                        editSuccsess(response.data);
                    }).catch(error => {
                        editRejected(error.response.data);
                    })
                setTimeout(() => navigate("/user/all"), 1000)
            }
        })
    }
    useEffect(() => {
        getUser((newID as string))
            .then(res => {
                setEditUser(res.data.user);
            })
            .catch((err) => {
                notification.error({
                    message: err.response.data.message,
                })
                navigate("/error/404")
            });
    }, [])

    return (
        <>
            {notificationContext}
            {modalContext}
            <Helmet>
                <title>{userID == 'me' ? t("edit account") : t("edit user")}</title>
            </Helmet>
            <Typography.Title className="text-center">
                {userID == 'me' ? t("edit account") : t("edit user")}
            </Typography.Title>
            {editableUser.username && <CreateForm
                initialValues={{
                    fname: editableUser.fname,
                    lname: editableUser.lname,
                    phone: editableUser.phone,
                    email: editableUser.email,
                    gender: editableUser.gender,
                    role: editableUser.role,
                    username: editableUser.username
                }}
                onFinish={(values) => {
                    notification.info({ message: 'Please Wait..', icon: <Spin /> });
                    values.dob = dayjs(values.dob).format('YYYY-MM-DD');
                    console.log(newID);
                    editUser((newID as string), CreateFormData(values))
                        .then(response => {
                            editSuccsess(response.data);
                        }).catch(error => {
                            editRejected(error.response.data);
                        })
                }}
                className="grid grid-cols-2 gap-5 "
                formSchema={userForm}
            >
                <br />
                <Form.Item>
                    <Button htmlType="submit" type="primary" block > <EditFilled />{t("edit")}</Button>
                </Form.Item>
                <Form.Item>
                    <Button
                        onClick={handelDelete}
                        className="bg-red-900 hover:bg-red-500" type="primary" block > <DeleteFilled /> {t("delete")} </Button>
                </Form.Item>
            </CreateForm>}
        </>
    );
};


export default AddCase;
