import React from 'react';

export class NavBar extends React.Component
{
    render()
    {
        const pathname = this.props.href;
        const currentPath = window.location.pathname;
        const className = this.props.className;

        return <nav className="navbar navbar-expand-lg bg-light fixed-top">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src="./logo192.png" height="50px" width="auto"/>
                    ITU Scheduler
                </a>
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className={`nav-link ${pathname === currentPath && "active"}`} href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${pathname === currentPath && "active"}`} href="#">Browse</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${pathname === currentPath && "active"}`} href="#">Schedule</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${pathname === currentPath && "active"}`} href="#">About Us</a>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <div className="input-group me-2">
                            <input className="form-control" type="search" placeholder="Search"/>
                            <button className="btn btn-primary" type="button">Search</button>
                        </div>
                    </form>
                </div>
            </div>
        </nav>;
    }
}