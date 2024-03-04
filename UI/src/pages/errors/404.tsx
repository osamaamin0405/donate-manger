import {  Button, Result } from "antd"
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet"

const PageNotFound: React.FC = ()=>(
  <>
    <Helmet>
      <title>404 | Page Not Found</title>
    </Helmet>
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary"><Link replace  to="/" type="primary" >Back Home</Link></Button>}
    />
  </>
)


export default PageNotFound;