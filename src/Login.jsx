import React, { useState, useEffect } from 'react';
import Input from './Input';
import './App.css';
import { Link } from 'react-router-dom';
import { signInWithGooglePopup, createUserDocFromAuth, signinAuthUserWithEmailAndPassword, signOutUser, auth } from './utils/firebase';
import './Login.css';
const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
    console.log(userDocRef)
};
const Login = () => {
    const [contact, setContact] = useState({
        email: '',
        password: ''
    });
    const [currentUser, setCurrentUser] = useState(null);

    const { email, password } = contact;

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setContact((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await signinAuthUserWithEmailAndPassword(email, password);
            console.log(response);
        } catch (error) {
            console.log('Error in signing in user:', error.message);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOutUser();
            setCurrentUser(null);
            console.log('User signed out successfully');
        } catch (error) {
            console.log('Error signing out:', error.message);
        }
    };

    return (
        <div className="login-container">
            {currentUser ? (
                <div className="login-box">
                    <h2>Welcome, {currentUser.displayName || currentUser.email}</h2>
                    <button onClick={handleSignOut} className="signout-btn">Sign Out</button>
                </div>
            ) : (
                <>
                    <div className="signup-link">
                        <Link to='/signup'>Sign up</Link>
                    </div>

                    <div className="login-box">
                        <form className="login-form" onSubmit={handleSubmit}>
                            <label>Your email</label>
                            <Input 
                                name='email'
                                type='text'
                                placeholder='email'
                                onChange={handleChange}
                                value={contact.email}
                            />
                            <label>Your password</label>
                            <Input 
                                name='password'
                                type='password'
                                placeholder='password'
                                onChange={handleChange}
                                value={contact.password}
                            />
                            <button type="submit" className="login-btn">Login</button>
                        </form>

                        <button onClick={signInWithGooglePopup} className="google-login-btn">Log in with Google</button>
                        <hr/>
                        <Link to='/signup'>
                            Sign up
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Login;



