import { Typography,Form, Button } from "antd";
import { Helmet } from "react-helmet";
import CreateForm from "../../../components/Form/CreateForm";
import addCase from "../../../Forms/AddCase.form";
// import DependsForm from "./DependsForm";
import dayjs from "dayjs";
import {addCase as addcase} from "../../../api/caseApi";
import { toast } from "react-toastify";
import { CreateFormData } from "../../../utils/helpers";
import { useTranslation } from "react-i18next";

type props = {
  onCreateSuccess?: ((data?:any)=>void)
  onCreateFild?: ((data?:any)=>void)

}

const AddCase: React.FC<props> = ({onCreateSuccess, onCreateFild})=>{

  const {t} = useTranslation();

  const addCaseSucsess = (response:any)=>{
    toast.success(response.message)
  }

  const AddCaseRejected = (error:any)=>{
    if(error.errors){
      for(const e in error.errors){
        toast.error(error.errors[e].msg)
      }
      return;
    }
    toast.error(error.message);
  }

  return (
    <>
      <Helmet>
        <title>Add Case</title>
      </Helmet>
      <Typography.Title level={1} className="text-center"> {t('add case')} </Typography.Title>
      <CreateForm 
          initialValues={{
          gender: 1,
          marital_status: 1,
          dob: dayjs("1980-01-01", "YYYY-MM-DD"),
          }} 
          onFinish={(values)=>{
            toast.loading('Please Wait..');
            values.dob = dayjs(values.dob).format('YYYY-MM-DD');
            addcase(CreateFormData(values))
            .then(response=>{
              toast.dismiss();
              addCaseSucsess(response.data);
              if(onCreateSuccess) onCreateSuccess(response.data);
            }).catch(error=>{
              toast.dismiss();
              AddCaseRejected(error.response.data);
              if(onCreateFild) onCreateFild(error.response.data);
            })
          }} 
          className="grid grid-cols-2 gap-5 " 
          formSchema={addCase} 
      >
        <Form.Item>
          <Button htmlType="submit" type="primary" block >{t('add case')}</Button>
        </Form.Item>
      </CreateForm>
    </>
  );
};


export default AddCase;
