import {Link} from "react-router-dom";

export default function IconLinkButton({icon, to, children, className, ...props})
{
    return <Link className={'btn gap-1' + className} {...props} to={to}>
        <span className="material-symbols-outlined align-middle">{icon}</span>
        {children}
    </Link>;
}