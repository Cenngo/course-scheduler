export default function TimeTableCell({children, height, color, halfway, ...props})
{
    return <div className={`badge position-absolute bg-primary start-0 text-wrap w-100 border justify-content-center d-flex flex-column ${halfway ? "top-50" : "top-0"}`} style={{height: `${height}%`}}>
        {children}
    </div>
}