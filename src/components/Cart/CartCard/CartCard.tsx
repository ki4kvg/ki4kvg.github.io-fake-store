import {Avatar, Card, Checkbox, Col, Row, InputNumber} from "antd";
import Meta from "antd/es/card/Meta";
import {useState} from "react";
import st from "./CartCard.module.css"
import {useNavigate} from "react-router-dom";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {DeleteOutlined} from '@ant-design/icons'
import {useAppDispatch, useAppSelector} from "../../../Hooks/hooks";
import {deleteCartAction, updateCartAction} from "../../../store/actions/productActions";
import {openNotification} from "../../Notification/Notification";

const CartCard = ({p, ...props}: any) => {
    const [checkValue, setCheckedValue] = useState()

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {cart} = useAppSelector(state => state.cartReducer)

    const onChange = (e: CheckboxChangeEvent) => {
        setCheckedValue(e.target.value);
        console.log(checkValue)
    };

    const onDelete = () => {
        dispatch(deleteCartAction(cart?.id)).then((res: any) => {
            openNotification(`Product delete info`, `Product had been deleted successfully.`, 'success' )
        }).catch(error => {
            openNotification(`Product delete info`, `Something went wrong. Error: ${error}`, 'error' )
        })
    };

    return (
        <Row className={st.cardRow}>
            <Col span={20}>
                <Card
                    onClick={() => navigate(`/products/${p.id}`)}
                    className={st.card}
                    hoverable={true}>
                    <Meta
                        className={st.cardMeta}
                        avatar={<Avatar src={p.image}/>}
                        title={p.title}
                        description={p.price}
                    />
                </Card>
            </Col>
            <Col span={4}>
                <Row>
                    <Checkbox value={p.id} onChange={onChange} className={st.checkBox}>Select product</Checkbox>
                </Row>
                <Row>
                    <DeleteOutlined className={st.icon} title={"Delete product"} onClick={onDelete}/>
                </Row>
            </Col>
        </Row>
    )
}

export default CartCard;