export default function Alert({icon, className, children, ...props})
{
    return <div className={"alert " + className}>
        <span className="material-symbols-outlined align-middle">{icon}</span>
        {children}
    </div>;
}