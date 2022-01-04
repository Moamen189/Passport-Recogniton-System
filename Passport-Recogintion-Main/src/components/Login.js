import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useJwt } from "react-jwt";
import './Login.css'

export default function Login() {

    const url = 'http://127.0.0.1:5000/api/auth/login';

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [isValid, setIsValid] = useState(true);

    const token = localStorage.getItem('token');

    const { isExpired } = useJwt(token);

    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            if (!isExpired) {
                navigate('/admin')
            }
            else {
                localStorage.clear();
                // navigate('./login')
            }
        }
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password
        }
        axios.post(url, data)
            .then(
                res => {
                    localStorage.setItem('token', res.data)
                    window.location.reload()
                })
            .catch(
                error => {
                    console.log(error)
                    setIsValid(false)
                    // navigate('/login');
                }

            )
    }

    return (
        <div>
            <div className="container mb-3">
                <div className="screen mx-auto mt-4 ">
                    <div className="screen__content">
                        <form className="login" onSubmit={handleSubmit}>
                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                <input type="text" className="login__input" placeholder="User name / Email" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input type="password" className="login__input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type='submit' className="button login__submit" >
                                <span className="button__text">Log In Now</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>
                        </form>
                    </div>
                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4"></span>
                        <span className="screen__background__shape screen__background__shape3"></span>
                        <span className="screen__background__shape screen__background__shape2"></span>
                        <span className="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>

                <div className="my-2">
                    {
                        isValid !== true ? (
                            <h5 className="text-danger text-center">Error in User Name or Password... </h5>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}
