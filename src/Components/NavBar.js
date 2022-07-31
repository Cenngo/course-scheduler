import React, {useEffect, useState} from 'react';
import Endpoints from "../Endpoints";
import {useLocation} from "react-router-dom";
import NavBarLink from "./NavBarLink";
import AuthPartial from "./LoginPartial";

export default function NavBar(props)
{
    return <nav className="navbar navbar-expand-lg fixed-top navbar-dark shadow" style={{backgroundColor: `rgba(89, 65, 242, .95)`}}>
        <div className="container">
            <a className="navbar-brand me-5" href={Endpoints.Index}>
                <img alt="logo" src="/logo.svg" height="50px" width="auto" style={{filter: "invert(1)"}}/>
                <span className="fs-5 ms-1">kiosk</span>
            </a>
            <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <NavBarLink to={Endpoints.Index}>Home</NavBarLink>
                    <NavBarLink to={Endpoints.Browse}>Browse</NavBarLink>
                    <NavBarLink to={Endpoints.Schedule}>Schedule</NavBarLink>
                    <NavBarLink to={Endpoints.AboutUs}>About Us</NavBarLink>
                </ul>
            </div>
        </div>
    </nav>;
}