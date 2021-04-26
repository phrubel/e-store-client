import React, { useContext, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { UserContext } from '../../App';
import OrderHistory from '../OrderHistory/OrderHistory'

const Order = (props) => {
    const [orderHistory, setOrderHistory] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    useEffect(() => {
        fetch('https://banana-crumble-11109.herokuapp.com/order')
            .then(res => res.json())
            .then(data => {
                setOrderHistory(data)
            })
    }, [])

    return (
        <Container>

            <h5>Welcome, <span style={{ color: "tomato", fontSize: "25px" }}>{loggedInUser.name}</span> Your recent order summary here:</h5>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Order Owner</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
            </Table>

            {
                orderHistory.map(orders => <OrderHistory orders={orders}></OrderHistory>)
            }

        </Container>


    );
};

export default Order;