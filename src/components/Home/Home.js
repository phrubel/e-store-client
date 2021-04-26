import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ProductCard from '../ProductCard/ProductCard';
import gif from '../../Icon/waiting-spinning.gif'


const Home = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://banana-crumble-11109.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
    }, [])

    return (
        <div>
            <Form className='container w-50 d-flex align-items-center mt-5'>
                <Form.Control type="email" placeholder="Search your product" />
                <Button variant="primary" type="submit"> Search </Button>
            </Form>

            <div className="row">
                {
                    products.length === 0 && <img style={{ marginLeft: "25%", marginTop: "25px" }} src={gif} alt="" />
                }
                {
                    products.map(product => <ProductCard product={product} key={product._id}></ProductCard>)
                }
            </div>

        </div>
    );
};

export default Home;