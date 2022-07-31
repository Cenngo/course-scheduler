import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {useContext, useEffect, useState, useTransition} from "react";
import {GetCourses} from "../CourseAPI";
import Spinner from "./Spinner";
import Modal from "./Modal";
import CourseDetailsCard from "./CourseDetailsCard";
import Endpoints from "../Endpoints";
import {CourseContext} from "../Services/CourseContext";
import {FavouritesContext} from "../Services/FavouritesContext";
import {AlertsContext, AlertTypes} from "../Services/AlertsContext";

export default function CourseSelectDialog(props)
{
    const [params, setParams] = useSearchParams();
    const [courses, setCourses] = useState([]);
    const [isPending, startTransition] = useTransition();
    const [selected, setSelected] = useState(-1);
    const navigate = useNavigate();
    const ctx = useContext(CourseContext);
    const favouritesCtx = useContext(FavouritesContext);
    const alertsCtx = useContext(AlertsContext);
    const favs = favouritesCtx.favourites;

    const facultyCode = params.get('facultyCode');
    const courseCode = params.get('courseCode');

    useEffect(() => {
        async function fetch()
        {
            const response = await GetCourses(facultyCode, courseCode);
            if(response.ok)
                setCourses(response.data);
        }

        startTransition(async () => fetch());
    }, []);

    function handleSubmit()
    {
        ctx.addCourse(selected);
        navigate('/' + Endpoints.Schedule);
    }

    return <Modal size="lg" onSubmit={handleSubmit}>
        {isPending && <Spinner className="text-primary mx-auto"/> }
        <ul className="list-group">
            {courses?.map(x => <li className={`list-group-item list-group-item-action ${x.crn === selected ? "list-group-item-primary" : ""}`} key={x.crn}>
                <input type="radio" name="course" className="form-check-input d-none" id={x.crn} checked={x.crn === selected} onChange={ev => setSelected(x.crn)}/>
                <label htmlFor={x.crn} className="w-100">
                    <CourseDetailsCard course={x} isFav={favs.includes(x.crn.toString())}/>
                </label>
            </li>)}
        </ul>
    </Modal>;
}