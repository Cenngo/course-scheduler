export default function NoMatch(props)
{
    return <div className="font-monospace d-md-flex justify-content-center user-select-none">
        <div className="col-md">
            <img className="float-md-end" style={{mixBlendMode: "darken"}} src="./404.jpg"/>
        </div>
        <div className="col-md align-middle d-flex flex-column justify-content-center text-center text-md-start">
            <h1 className="text-danger fw-bold">404</h1>
            <h1>Oops... Are you lost?</h1>
        </div>
    </div>;
}