import { Button, Form, Typography, notification } from "antd";
import AddUserForm from "../../../Forms/AddUser.form";
import CreateForm from "../../../components/Form/CreateForm";
import { addUserRequest } from "../../../api/user";
import { CreateFormData } from "../../../utils/helpers";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";


export default function AddUser(){
    const [api, NotificationContext] = notification.useNotification(),
        {t} = useTranslation();
    return (
        <>
            <Helmet>
                <title>{t("add user")}</title>
            </Helmet>
            {NotificationContext}
            <Typography.Title className="text-center">{t("add user")}</Typography.Title>
            <CreateForm
                initialValues={{
                    role: 1,
                    gender: 1,
                }}
                onFinish={(values)=>{
                    addUserRequest(CreateFormData(values))
                    .then(res=>{
                        api.success({
                            message: res.data.message,
                        })
                    })
                    .catch(err=>{
                        api.error({
                            message: err.response.data.name,
                            description: err.response.data.message
                        })
                    })
                }} 
                className="grid grid-cols-2 gap-5 " 
                formSchema={AddUserForm}>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" block >{t("add user")}</Button>
                    </Form.Item>
                </CreateForm>
        </>
    );

}