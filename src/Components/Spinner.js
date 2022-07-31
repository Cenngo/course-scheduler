export default function Spinner({className, ...props})
{
    return <div className="d-flex justify-content-center">
        <div className={`spinner-border ${className}`} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>;
}