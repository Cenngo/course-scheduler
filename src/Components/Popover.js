import {useState} from "react";

export default function Popover({children, ...props})
{
    const [show, setShow] = useState(true);

    return <div className="popover bs-popover-auto show">

    </div>;
}