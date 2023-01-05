import {Avatar, Card, Col, Row} from "antd";
import Meta from "antd/es/card/Meta";
import st from "./CartCard.module.css"
import {useNavigate} from "react-router-dom";
import {DeleteOutlined} from '@ant-design/icons'
import {useAppDispatch} from "../../../Hooks/hooks";
import {deleteCartAction} from "../../../store/actions/productActions";
import {openNotification} from "../../Notification/Notification";

const CartCard = ({p, cartId}: any) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onDelete = () => {
        dispatch(deleteCartAction(cartId)).then(() => {
            openNotification(`Product delete info`, `Product had been deleted successfully.`, 'success')
        }).catch(error => {
            openNotification(`Product delete info`, `Something went wrong. Error: ${error}`, 'error')
        })
    };

    return (
        <Row className={st.cardRow}>
            <Col md={24} lg={20}>
                <Card
                    className={st.card}
                    hoverable={true}
                    extra={
                        <Row className={st.cartExtra}>
                            <DeleteOutlined className={st.icon} title={"Delete product"} onClick={onDelete}/>
                        </Row>
                    }>
                    <div onClick={() => navigate(`/products/${p.id}`)}>
                        <Meta
                            className={st.cardMeta}
                            avatar={<Avatar src={p.image}/>}

                            title={p.title}
                            description={"$" + p.price}
                        />
                    </div>
                </Card>
            </Col>
        </Row>
    )
}

export default CartCard;