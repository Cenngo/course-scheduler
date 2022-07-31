import {AuthContext} from "../Services/AuthContext";
import IconLinkButton from "./IconLinkButton";
import Endpoints from "../Endpoints";

export default function AuthPartial(props)
{
    return <AuthContext.Consumer>
        {ctx => ctx?.isAuthenticated ? <UserPartial user={ctx.user}/> : <LoginPartial/>}
    </AuthContext.Consumer>;
}

function UserPartial({user, ...props})
{
    return <li className="nav-item dropdown">
        <a className="nav-link active" href="#" role="button" data-bs-toggle="dropdown">
            <span className="d-flex justify-content-center">
                <span className="material-symbols-outlined">account_circle</span>
                {user?.username}
                <span className="material-symbols-outlined">expand_more</span>
            </span>
        </a>
        <ul className="dropdown-menu dropdown-menu">
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><a className="dropdown-item" href="#">Courses</a></li>
            <li><a className="dropdown-item" href="#">Schedules</a></li>
            <li>
                <IconLinkButton className="dropdown-item text-danger border-top mt-3 pt-2 rounded-0" to="#" icon="logout">
                    Logout
                </IconLinkButton>
            </li>
        </ul>
    </li>;
}

function LoginPartial(props)
{
    return <li className="nav-item">
        <a href={Endpoints.Login} className="btn btn-primary mx-2">Login</a>
        <a href={Endpoints.Register} className="btn btn-secondary">Register</a>
    </li>;
}