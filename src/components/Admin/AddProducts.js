import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import logo from '../../Icon/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faThLarge } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';


const AddProducts = () => {
    const [imgURL, setImgURL] = useState(null)
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        const productData = {
            name: data.name,
            imgUrl: imgURL,
            price: data.price,
            weight: data.weight
        };
        fetch('https://banana-crumble-11109.herokuapp.com/addProducts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
            .then(res => console.log('server side adedd', res))
    };

    const handleImageUpload = product => {
        const imageData = new FormData()
        imageData.set('key', 'ecb776bba635bbad9abdaf1d401ce1c1')
        imageData.append('image', product.target.files[0])

        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                setImgURL(response.data.data.display_url);

            })
            .catch(function (error) {
                console.log(error);
            });


    }


    return (
        <div className="m-5">
            <div className="d-flex">
                <Link to="/home" style={{ textDecoration: 'none' }}>
                    <img style={{ width: '13vw' }} src={logo} alt="" />
                </Link>
                <h4 style={{ marginLeft: '10vw' }}> Add Product</h4>
            </div>
            <aside style={{ marginTop: '10vh', zIndex: '-1' }}>
                <Link to='/admin' style={{ textDecoration: 'none' }}>
                    <div className="d-flex">
                        <img style={{ height: '4vh' }} className="mr-3" alt="" />
                        <h6> <FontAwesomeIcon icon={faThLarge} />  Manage Product</h6>
                    </div>
                </Link>
                <Link to="addproduct">
                    <div className="d-flex mt-3" style={{ cursor: 'pointer' }}>
                        <img style={{ height: '4vh' }} className="mr-3" alt="" />
                        <h6><FontAwesomeIcon icon={faPlusSquare} />  Add Products</h6>
                    </div>
                </Link>
            </aside>
            <main style={{ marginLeft: '23vw', width: '70vw', marginTop: '-5vw' }}>
                <form className="d-flex row" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-md-3">
                        <label >Product Name</label>
                        <input className="input-field " name="name" required ref={register} />
                        <label>Add Price</label>
                        <input className="input-field " name="price" ref={register} />
                        <br />
                        <label>Weight</label>
                        <input className="input-field " name="weight" ref={register} />
                        <label>Add Photo</label> <br />
                        <input name="exampleRequired" onChange={handleImageUpload} type="file" />
                        <button style={{ backgroundColor: "tomato", borderRadius: "5px" }} type="submit">Submit</button>
                    </div>
                </form>
            </main>
        </div>

    );
};

export default AddProducts;