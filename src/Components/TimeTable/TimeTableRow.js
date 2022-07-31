import TimeTableCell from "./TimeTableCell";

export default function TimeTableRow({courses, time, header, ...props})
{
    const target = courses?.filter(x => x.hour == time);

    return <tr>
        <th scope="row">{header}</th>
        {[...Array(5).keys()].map(index => <td className="position-relative px-5" key={index}>
            {target?.filter(x => x.day === index + 1).map(x => <TimeTableCell height={x.duration * 100} key={x.crn} halfway={x.min === 30}>
                <span className="m-1">{x.code} - {x.name}</span>
                <hr className="m-1"/>
                <span className="m-1">{x.crn}</span>
            </TimeTableCell>)}
        </td> )}
    </tr>;
}