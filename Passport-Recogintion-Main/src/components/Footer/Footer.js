import React from 'react'
import './Footer.css'
import logo from '../team logo.png'
function Footer() {
    return (

        <footer className="pt-4 my-font-small font-weight-lighter">

            <div className="container text-center text-md-left">

                <div className="row">

                    <div className="my-2 mx-auto">

                        <h5 className="font-weight-bold mt-3 mb-4 logo">
                            <img src={logo} alt="logo" width='32' />P<span>D</span>
                        </h5>
                        <p>This website was created in DEC 10, 2021.</p>
                        <p>
                            This is a passport scanning web service to help you scan, identify and validate your passport created with a simple and flexible design and ready to be integrated right into your system!.
                        </p>
                    </div>

                    <hr className=" w-100 d-md-none" />

                </div>

            </div>

            {/* <hr /> */}

            {/* social buttons */}
            <ul className="list-unstyled list-inline text-center">
                <li className="list-inline-item">
                    <a className="btn-floating btn-fb mx-1" href='https://www.facebook.com/profile.php?id=100013882777343' target='_blank' rel="noreferrer">
                        <i className="fab fa-facebook-f fa-lg"> </i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="btn-floating btn-tw mx-1" href='https://twitter.com/_youssef_waael_' target='_blank' rel="noreferrer">
                        <i className="fab fa-twitter fa-lg"> </i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="btn-floating btn-gplus mx-1" href='https://mail.google.com/mail/u/1/?fs=1&to=youssefwael397gmail.com&tf=cm' target='_blank' rel="noreferrer">
                        <i className="fab fa-google-plus-g fa-lg"> </i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="btn-floating btn-li mx-1" href='https://www.linkedin.com/in/ahmed-abbas-2a31651a1/' target='_blank' rel="noreferrer">
                        <i className="fab fa-linkedin-in fa-lg"> </i>
                    </a>
                </li>

            </ul>

            <div className="footer-copyright text-center py-3">
                © 2021 Copyright :
                <a href='/'> passdetector.com</a>
            </div>
        </footer >

    )
}

export default Footer
