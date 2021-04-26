import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import google from '../../Icon/google.png'
import { Button } from 'react-bootstrap';
import "./Login.css";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const googleProvider = new firebase.auth.GoogleAuthProvider();

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } };



    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email }
                setLoggedInUser(signedInUser);
                history.replace(from)
            }).catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage)
                // ...
            });
    }
    return (
        <div className='login-btn'>
            <h2>Sign In with Google</h2>
            <Button className="w-25" onClick={handleGoogleSignIn} variant="warning"> <img style={{ width: '25px', height: "25px" }} src={google} alt="" /> Signin</Button>
        </div>
    );
};

export default Login;