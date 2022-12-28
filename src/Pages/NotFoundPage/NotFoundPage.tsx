import {Button, Layout, Result} from 'antd';
import st from "./NotFoundPage.module.css"
import {useNavigate} from "react-router-dom";

const NotFoundPage = () => {

    const navigate = useNavigate();

    return (
        <Layout.Content className={st.notFound}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the product you searched does not exist."
                // extra={<Button onClick={() => navigate(`/`)} type="primary">Back Home</Button>}
            />
        </Layout.Content>
    )
};
export default NotFoundPage;