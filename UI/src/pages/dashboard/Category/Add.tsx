import { Button, Form, Spin, Typography, notification } from "antd";
import CreateForm from "../../../components/Form/CreateForm";
import { AddCategoryForm } from "../../../Forms/AddCategory.form";
import { addCategory } from "../../../api/category";
import { CreateFormData } from "../../../utils/helpers";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";


export default function AddCategory(){
    const [notificationApi, NotificationContext] = notification.useNotification(),
        {t} = useTranslation();

    return (
        <>
            <Helmet>
                <title>{t("add category")}</title>
            </Helmet>
            {NotificationContext}
            <Typography.Title> {t("add category")} </Typography.Title>
            <br/>
            <CreateForm 
                onFinish={(values)=>{
                    notificationApi.info({
                        message: "Loading Please wait",
                        icon:      <Spin size="large" />
                    });
                    addCategory(CreateFormData(values))
                    .then(response=>{
                        notificationApi.destroy();
                        notificationApi.success({
                            message: response.data.message
                        })
                    })
                    .catch(err=>{
                        notificationApi.destroy();
                        notificationApi.error({
                            message: err.response.data.message
                        })
                    })
                }}
                formSchema={AddCategoryForm}>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>{t("add category")}</Button>
                </Form.Item>
            </CreateForm>
        </>
    );
}