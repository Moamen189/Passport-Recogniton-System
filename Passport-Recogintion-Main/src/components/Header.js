import React, { useState, useEffect } from "react";
import {
    NavLink,
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import jwtDecode from 'jwt-decode'
import logo from './team logo.png'

import Home from './Home'
import Help from './Help/Help'
import Admin from './Admin'
import Login from './Login';


function Header() {

    const [isValid, setIsValid] = useState(true)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token')
            const decoded = jwtDecode(token)
            // console.log(decoded.role)
            if (decoded.role) {
                setIsValid(true)
            } else {
                setIsValid(false)
            }
        } else {
            setIsValid(false)
        }

    }, [isValid])

    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-dark my-bg ">
                <div className="container">
                    <NavLink className="navbar-brand logo" to="/"><img src={logo} alt="logo" width='32' />P<span>D</span>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto "> {/* my-font */}
                            <li className="nav-item mx-md-3 mx-sm-0">
                                <NavLink className="nav-link" to="/"><i className="fas fa-home"></i> Home</NavLink>
                            </li>
                            {/* <li className="nav-item mx-3 mx-sm-0">
                                <NavLink className="nav-link" to="/admin"><i class="fas fa-user-shield"></i> Admin</NavLink>
                            </li> */}
                            <li className="nav-item mx-md-3 mx-sm-0">
                                <NavLink className="nav-link" to="/help"><i className="fas fa-question-circle"></i> Help</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Routes>
                {
                    isValid ? <Route exact path="/admin" element={<Admin />} /> : <Route exact path="/admin" element={<Login auth={isValid} />} />

                }
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/" element={<Home />} />
                <Route exact path="/help" element={<Help />} />
            </Routes>


        </Router>
    )
}

export default Header;