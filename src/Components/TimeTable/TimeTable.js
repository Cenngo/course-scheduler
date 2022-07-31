import {useEffect, useState} from "react";
import TimeTableRow from "./TimeTableRow";
import {useLocalTime} from "../../Services/Hooks";

export default function TimeTable({items, ...props})
{
    const [events, setEvents] = useState([]);
    const localTime = useLocalTime();

    useEffect(() => {
        const mapped = [];

        for(const course of items)
        {
            if(!course)
                continue;

            for(const time of course?.times)
            {
                if(!time)
                    continue;

                const startTime = localTime(time.startTime);
                const endTime = localTime(time.endTime);
                const dayOfWeek = time.dayOfWeek
                mapped.push({
                    hour: startTime.getHours(),
                    min: startTime.getMinutes(),
                    day: time.dayOfWeek,
                    duration: (endTime.getHours() - startTime.getHours()),
                    name: course.courseTitle,
                    code: course.courseCode,
                    crn: course.crn
                });
            }
        }

        setEvents(mapped);
    }, [items]);

    return <div className="table-responsive mt-4 bg-white shadow p-3 rounded">
        <table className="table">
            <thead>
            <tr className="table-secondary">
                <th scope="col">Time of Day</th>
                <th scope="col">Mon</th>
                <th scope="col">Tue</th>
                <th scope="col">Wed</th>
                <th scope="col">Thu</th>
                <th scope="col">Fri</th>
            </tr>
            </thead>
            <tbody>
            <TimeTableRow header="8:00 AM" time="8" courses={events}></TimeTableRow>
            <TimeTableRow header="9:00 AM" time="9" courses={events}></TimeTableRow>
            <TimeTableRow header="10:00 AM" time="10" courses={events}></TimeTableRow>
            <TimeTableRow header="11:00 AM" time="11" courses={events}></TimeTableRow>
            <TimeTableRow header="12:00 AM" time="12" courses={events}></TimeTableRow>
            <TimeTableRow header="1:00 PM" time="13" courses={events}></TimeTableRow>
            <TimeTableRow header="2:00 PM" time="14" courses={events}></TimeTableRow>
            <TimeTableRow header="3:00 PM" time="15" courses={events}></TimeTableRow>
            <TimeTableRow header="4:00 PM" time="16" courses={events}></TimeTableRow>
            <TimeTableRow header="5:00 PM" time="17" courses={events}></TimeTableRow>
            </tbody>
        </table>
    </div>;
}