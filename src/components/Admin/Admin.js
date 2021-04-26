import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlusSquare, faThLarge, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import logo from '../../Icon/logo.png'
import gif from '../../Icon/waiting-spinning.gif'

const Admin = () => {
    const [allProduct, setAllProduct] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = () => {
        fetch('https://banana-crumble-11109.herokuapp.com/allProducts')
            .then(res => res.json())
            .then(data => {
                setAllProduct(data)
                setLoading(false)
            })
    }

    const deleteProduct = (_id) => {
        fetch(`https://banana-crumble-11109.herokuapp.com/product/${_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                getProducts()
            })
    }



    return (
        <div className="m-5">
            <div className="d-flex">
                <Link to="/home" style={{ textDecoration: 'none' }}>
                    <img style={{ width: '13vw' }} src={logo} alt="" />
                </Link>
                <h4 style={{ marginLeft: '10vw' }}>Manage Product</h4>
            </div>
            <aside style={{ marginTop: '10vh', zIndex: '-1' }}>
                <Link to='/admin' style={{ textDecoration: 'none' }}>
                    <div className="d-flex">
                        <img style={{ height: '4vh' }} className="mr-3" alt="" />
                        <h6> <FontAwesomeIcon icon={faThLarge} />  Manage Product</h6>
                    </div>
                </Link>
                <Link to="addProduct">
                    <div className="d-flex mt-3" style={{ cursor: 'pointer' }}>
                        <h6> <FontAwesomeIcon icon={faPlusSquare} />   Add Product</h6>
                    </div>
                </Link>
            </aside>
            <main>

                <table className="table" style={{ marginLeft: '23vw', width: '70vw', marginTop: '-5vw' }}>
                    <thead className="thead-danger">
                        <tr>

                            <th scope="col">Product Name</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allProduct.length === 0 && <img style={{ marginLeft: "28%", marginTop: "20px" }} src={gif} alt="" />
                        }

                        {
                            allProduct.map(product =>
                                <tr>
                                    <td>{product.name}</td>
                                    <td>{product.weight}</td>
                                    <td>$ {product.price}</td>
                                    <td><FontAwesomeIcon style={{ cursor: "pointer" }} icon={faEdit} /></td>
                                    <td onClick={() => deleteProduct(product._id)}><FontAwesomeIcon style={{ cursor: "pointer" }} icon={faTrashAlt} /> </td>
                                </tr>)
                        }


                    </tbody>
                </table>




            </main>
        </div >
    );

};

export default Admin;