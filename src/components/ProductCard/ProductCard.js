import React from 'react';
import { Button, Card, Container, } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const ProductCard = (props) => {
    const { name, imgUrl, price, _id } = props.product
    const history = useHistory()

    const handleCheckOut = () => {
        history.push(`/checkout/${_id}`)
    }

    return (
        <Container className="bg-dark col-md-4 mt-5">
        <Card className="card  mt-3">
            <Card.Img variant="top" src={imgUrl} />
            <Card.Body>
                <h2 className="text-center">{name}</h2>
                <div className="d-flex">
              <h3 className="m-2">${price}</h3>
               <Button style={{ marginLeft: "40%" }} onClick={() => handleCheckOut(_id)} variant="primary">Buy Now</Button>
            </div>
            </Card.Body>
        </Card>
    </Container>
    );
};

export default ProductCard;