import React, { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useParams } from "react-router";
import { UserContext } from "../../App";
import "./CheckOut.css";
const CheckOut = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState({});
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)


  useEffect(() => {
    fetch("https://banana-crumble-11109.herokuapp.com/product/" + _id)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [_id]);

  const handelCheckOut = () => {
    const orderDetails = {
      orderedBy: loggedInUser.displayName,
      orderOwnerEmail: loggedInUser.email,
      productName: product.name,
      quantity: 1,
      wight: product.wight,
      price: product.price,
    };

    fetch("https://banana-crumble-11109.herokuapp.com/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert('Order Placed Successfully')
          console.log("order place successfully");
        }
      });
  };

  return (
    <section className="container px-5 check-out-section">
      <article>
        <h2 className="mt-5">CheckOut</h2>
        <Table className="p-5" hover>
          <thead>
            <tr className="text-secondary">
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody className="border-top border-bottom">
            <tr>
              <td>{product.name}</td>
              <td>1</td>
              <td>${product.price}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">Total</td>
              <td>${product.price}</td>
            </tr>
          </tfoot>
        </Table>
        <Button variant="primary" className="ml-auto d-block"onClick={handelCheckOut}> Checkout</Button>
      </article>
    </section>
  );
};

export default CheckOut;