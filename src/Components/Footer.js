import React from 'react';
import Endpoints from "../Endpoints";

export default function Footer(props)
{
    return <div className="container mt-5">
        <hr/>
        <footer className="row mt-2 py-5">
            <div className="col-md-2 mb-3">
                <a href="/" className="mb-3 link-dark text-decoration-none">
                    <div className="d-inline-flex flex-column align-items-center mb-md-3 offset-md-2">
                        <img alt="logo" className="" src="./logo_footless.svg" height="50px" width="auto" style={{filter: "invert(.2)"}}/>
                        <p className="d-inline-block fs-1 mt-0 text-black" style={{filter: "invert(.2)"}}>kiosk</p>
                    </div>
                    <p className="text-muted offset-md-2">© {new Date().getFullYear()} Cenk Ergen</p>
                </a>
            </div>
            <div className="col-md-2 ms-auto">
                <h5>Site Map</h5>
                <ul className="navbar-nav flex-column">
                    <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Home</a></li>
                    <li className="nav-item mb-2"><a href={Endpoints.Browse} className="nav-link p-0 text-muted">Browse Courses</a>
                    </li>
                    <li className="nav-item mb-2"><a href={Endpoints.Schedule} className="nav-link p-0 text-muted">Create Schedule</a>
                    </li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
                    <li className="nav-item mb-2"><a href={Endpoints.AboutUs} className="nav-link p-0 text-muted">About Us</a></li>
                </ul>
            </div>
            <div className="col-md-2">
                <h5>API</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Documentation</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Terms of Service</a>
                    </li>
                </ul>
            </div>
        </footer>
    </div>;
}