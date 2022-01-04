import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios';
import PassportTable from './Table';

export default function Admin() {

    let navigate = useNavigate();

    // check one if token is valid 
    useEffect(() => {
        const params = {
            token: localStorage.getItem('token')
        }

        axios.post('http://127.0.0.1:5000/api/auth/token', params)
            .then(res => {
                if (!res.data) {
                    localStorage.clear();
                    navigate('/login')

                }
            })
    }, [navigate])



    useEffect(() => {

        if (localStorage.getItem('token')) {

            const token = localStorage.getItem('token')
            const decoded = jwtDecode(token)

            const exp_date = new Date(decoded.exp * 1000);
            const now_date = new Date();

            // console.log(decoded.exp)

            if (!decoded.role) {
                localStorage.clear()
                navigate('/login')
            } else {
                if (exp_date < now_date) {
                    localStorage.clear()
                    navigate('/login')
                }
            }

        }
    })

    return (
        <div className=''>
            <PassportTable />
        </div>
    )
}