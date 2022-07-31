import {React, Component, Fragment, useContext, useEffect} from "react";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import {Routes, Route, Outlet, useParams} from "react-router-dom";
import {AlertsContext, AlertsProvider} from "./Services/AlertsContext";
import IconButton from "./Components/IconButton";

export default function Layout(props)
{
    let params = useParams();
    const alertsCtx = useContext(AlertsContext);
    const queue = alertsCtx.queue;

    useEffect(() => {
        var callbacks = [];

       for(const item of queue)
       {
           const handle = setTimeout(() => alertsCtx.removeAlert(item.id), item.delay !== -1 ? item.delay : 2000);
           callbacks.push(handle);
       }

       return () => {
           for (const handle of callbacks)
            clearTimeout(handle);
       }
    });

    return <Fragment>
        <NavBar/>
        <div className="container" style={{paddingTop: "7rem"}}>
            <Outlet/>
        </div>
        <div className="alert-container col-md-3 position-fixed bottom-0 end-0 m-md-5 m-2" style={{zIndex:2}}>
            {alertsCtx.queue?.reverse().map((alert) =>
                <div className={"alert d-flex p-2 " + alert.type} role="alert" key={alert.id}>
                    <span className="me-5">{alert.message}</span>
                    <IconButton icon="close" className="ms-auto text-white align-middle position-absolute top-0 end-0 " onClick={() => alertsCtx.removeAlert(alert.id)}></IconButton>
                </div>)
            }
        </div>
        <Footer/>
    </Fragment>;
}