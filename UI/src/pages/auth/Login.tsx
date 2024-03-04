import { Button, Card, Col, Form, Row, Space, Typography } from "antd";
import CreateForm from "../../components/Form/CreateForm";
import LoginForm from "../../Forms/Login.form";
import {loginUser} from "../../store/api/authAPI";
import {authSelector} from "../../store"
import { useDispatch, useSelector} from "react-redux";
import { Helmet } from "react-helmet";



export default function Login() {
    const dispatch = useDispatch(),
		user = useSelector(authSelector);
	if(user.isLogin) {
		window.location.href="/"
		return ;
	}
	return(
		<>
			<Helmet>
				<title>Please Login</title>
			</Helmet>
			<Space style={{display: 'flex', justifyContent:'center', marginTop:14}}>
				<Typography.Title>Welcome back</Typography.Title>
			</Space>
			<Row justify='center'>
				<Col span={6} sm={12}>
					<Card bordered title='Please Login First'>
						<CreateForm 
                            onFinish={(values)=>{
                                //@ts-ignore
                                dispatch(loginUser({username: values.username, password: values.password}))
                            }} 
                            formSchema={LoginForm}
                        >
                            <Form.Item>
                                <Button block type="primary" htmlType="submit">Login</Button>
                            </Form.Item>
                        </CreateForm>
					</Card>
				</Col>
			</Row>
		</>
	)
}