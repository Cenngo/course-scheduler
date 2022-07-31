import {GetDayName} from "../CourseAPI";
import {Fragment} from 'react';
import {useLocalTime} from "../Services/Hooks";

export default function CourseDetailsCard({course, children, isFav, ...props})
{
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    const fillPercentage = course.enrolled / course.capacity * 100;
    const localTime = useLocalTime();

    let sortTimes = (a, b) => {
        if(b.dayOfWeek > a.dayOfWeek)
            return -1;
        else if(a.dayOfWeek > b.dayOfWeek)
            return 1;
        else
            return 0;
    }

    let getBarColor = () => {
        const percentage = course.enrolled / course.capacity * 100;
        if(percentage < 60)
            return "bg-success";
        else if (percentage < 100)
            return "bg-warning";
        else
            return "bg-danger";
    }

    function mapTimesAndPlaces()
    {
        let times = course.times.sort(sortTimes);
        let buildings = course.buildings;
        return times?.map((time, index) => {
            return <li key={index}>
                <div className="d-flex justify-content-between">
                    <strong>{buildings[index]?.code ?? "N/A"}</strong>
                    {GetDayName(time.dayOfWeek)}
                </div>
                <div className="d-flex justify-content-between">
                    <span><strong className="text-muted">Starts at: </strong>{!time.startTime ? "N/A" : localTime(time.startTime).toLocaleTimeString([], timeOptions)}</span>
                    <span><strong className="text-muted">Ends at: </strong>{!time.endTime ? "N/A" : localTime(time.endTime).toLocaleTimeString([], timeOptions)}</span>
                </div>
            </li>
        });
    }

    return <div {...props}>
        <div className="d-flex justify-content-between mb-2 mt-2 g-2">
            <h4 className="text-primary">({course.crn}) {course.courseTitle}</h4>
            <div className="fw-bolder col-1 ms-2">
                <span className="d-flex justify-content-center">{course.enrolled}/{course.capacity}</span>
                <div className="progress mx-auto">
                    <div className={`progress-bar ${getBarColor()}`} role="progressbar" style={{width: `${fillPercentage}%`}}></div>
                </div>
            </div>
        </div>
        <h5 className="d-inline">{course.courseCode}</h5>
        {isFav && <span className="material-symbols-outlined align-middle float-end" style={{color: "var(--bs-pink)"}}>favorite</span>}
        <hr/>
        <div className="row gy-3">
            <div className="col-md-4">
                <div>
                    <h5>Instructors</h5>
                    <ul className="list-unstyled">
                        {course.instructors?.map((x, index) => <li key={index}>{x}</li>)}
                    </ul>
                </div>
            </div>
            <div className="col-md-4">
                <div>
                    <h5>Course Times and Locations</h5>
                    <ul className="list-unstyled">
                        {mapTimesAndPlaces(course)}
                    </ul>
                </div>
            </div>
        </div>
        {children}
    </div>;
}