import {useRef} from "react";

export default function Toast({delay, color, children, ...props})
{
    const toastRef = useRef();

    return <div className="toast-container position-fixed bottom-0 end-0 p-3 show">
        <div className="toast" role="alert">
            <div className={"toast-body border-start border-3" + `border-${color}`}>
                {children}
            </div>
        </div>
    </div>;
}