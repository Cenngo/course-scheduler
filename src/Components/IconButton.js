export default function IconButton({icon, onClick, children, className, ...props})
{
    return <button className={'btn gap-1' + className} {...props} onClick={onClick}>
        <span className="material-symbols-outlined align-middle">{icon}</span>
        {children}
    </button>
}