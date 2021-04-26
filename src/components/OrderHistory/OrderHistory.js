import React, { useContext, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { UserContext } from '../../App';

const OrderHistory = (props) => {
    const { orderOwnerEmail, productName, price, quantity } = props.orders
    const [orders, setOrder] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    useEffect(() => {
        fetch('https://banana-crumble-11109.herokuapp.com/orderHistory?email=' + loggedInUser.email)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [])

    return (
        <Container>

            <Table striped bordered hover size="sm">
                <tbody>
                    <tr>
                        <td>{orderOwnerEmail}</td>
                        <td>{productName}</td>
                        <td>{quantity}</td>
                        <td>${price}</td>
                    </tr>
                </tbody>
            </Table>

        </Container>
    );
};

export default OrderHistory;