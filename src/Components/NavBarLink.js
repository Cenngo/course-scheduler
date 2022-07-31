import {useMatch, useResolvedPath} from "react-router-dom";

export default function NavBarLink({to, children, ...props})
{
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: false }) && resolved.pathname !== "/";

    return <li className={`nav-item ${match && "border-bottom border-3"}`}>
        <a className={`nav-link ${match && "active"}`} href={to}>{children}</a>
    </li>;
}