import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Modal({children, onSubmit, className, size, ...props})
{
    let navigate = useNavigate();
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => setShow(true), 50);
    }, []);

    function close()
    {
        setShow(false);
        setTimeout(() => navigate("../"), 100);
    }

    return <div className={`modal fade d-block ${show ? "show" : "hide"} ${className}`} tabIndex="-1" style={{background: "rgba(0, 0, 0, .50)"}}>
        <div className={`modal-dialog modal-dialog-scrollable ${!!size ? `modal-${size}` : ""}`}>
            <div className="modal-content p-2">
                <div className="modal-header">
                    <h5 className="modal-title">Select a Course Code</h5>
                    <button type="button" className="btn-close" onClick={(ev) => close()}></button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={(ev) => close()}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={onSubmit}>Confirm</button>
                </div>
            </div>
        </div>
    </div>;
}