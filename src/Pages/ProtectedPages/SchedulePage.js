import TimeTable from "../../Components/TimeTable/TimeTable";
import {GetCourseCodes, GetCourseInfo, GetFacultyCodes} from "../../CourseAPI";
import {useContext, useEffect, useReducer, useState, useTransition} from "react";
import Modal from "../../Components/Modal";
import Endpoints from "../../Endpoints";
import CourseCodeSelectDialog from "../../Components/CourseCodeSelectDialog";
import {Link, useLocation, Outlet, useSearchParams, useParams} from "react-router-dom";
import {CourseContext} from "../../Services/CourseContext";
import {useLocalStorage} from "../../Services/Hooks";
import Spinner from "../../Components/Spinner";
import IconButton from "../../Components/IconButton";
import IconLinkButton from "../../Components/IconLinkButton";

export default function SchedulePage(props)
{
    let ctx = useContext(CourseContext);
    let [courses, setCourses] = useState([]);
    let [isPending, startTransition] = useTransition();
    const crns = ctx.courses;
    const fillCrn = `javascript:void%20function(){const%20a=[${crns.join(',')}],b=document.querySelectorAll(%22input[placeholder=\\%22CRN%20Giriniz.\\%22]%22);for(let%20c=0;c%3Ca.length%26%26c%3Cb.length;c++){b[c].value=a[c],b[c].dispatchEvent(new%20Event("input"));}}();`;

    async function fetch() {
        const data = await Promise.all(crns?.map(async (crn) => {
            if(!crn)
                return;

            if(courses.includes(x => x.crn === crn))
                return;

            const response = await GetCourseInfo(crn);
            if(response.ok)
                return response.data;
        }));

        setCourses(data);
    }

    useEffect(() => {
        startTransition(async () => await fetch());
    }, [crns])

    return <div>
        <h2 className="mb-3">Create Schedule</h2>
        <span>
            <IconLinkButton className="btn btn-success me-2" to={`${Endpoints.Modals.CourseCodePicker}`} icon="add">Add Course</IconLinkButton>
            <IconButton className="btn btn-danger me-2" icon="delete" onClick={() => ctx.clear()}>Clear</IconButton>
            <br/>
            <IconButton data-bs-toggle="collapse" data-bs-target="#courses" icon="visibility" className="btn btn-secondary mt-2 me-2">Show Course List</IconButton>
            <br/>
            <a href={fillCrn} className="btn btn-outline-primary mt-2 d-none d-lg-inline-block" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Drag&Drop to your bookmarks bar.">
                <div className="d-flex justify-content-center gap-1">
                    <span className="material-symbols-outlined align-middle">add_link</span>
                    Fill CRN
                </div>
            </a>
        </span>
        <div className="collapse w-100" id="courses">
            <ul className="list-unstyled mt-3">
                {courses?.map(x => <li key={x.crn} className="mb-1">
                    <div className="card card-body">
                        <div className="row gap-2">
                            <div className="col-md-1 d-flex align-items-center gap-2">
                                <strong>{x.crn}</strong>
                                <div className="vr d-none d-md-block"/>
                            </div>
                            <div className="col-md-5 d-flex">
                                <p className="my-1">{x.courseTitle}</p>
                            </div>
                            <div className="col-md-3 d-flex">
                                <span className="my-1">{x.instructors.join(' , ')}</span>
                            </div>
                            <div className="col-md-2 ms-auto d-flex gap-2">
                                <div className="vr d-none d-md-block"/>
                                <IconLinkButton icon="library_books" className="btn btn-info" to={`/${Endpoints.Course}/${x.crn}`}>Details</IconLinkButton>
                                <IconButton icon="delete" className="btn btn-outline-danger" onClick={() => ctx.removeCourse(x.crn)}></IconButton>
                            </div>
                        </div>
                    </div>
                </li>)}
            </ul>
        </div>
        <TimeTable items={courses}/>
        <Outlet/>
    </div>;
}