import {Layout, Result} from 'antd';
import st from "./NotFoundComponent.module.css"


const NotFoundComponent = () => {

    return (
        <Layout.Content className={st.notFound}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the product you searched does not exist."
            />
        </Layout.Content>
    )
};
export default NotFoundComponent;