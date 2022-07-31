import {useParams, useNavigate, useSearchParams} from "react-router-dom";
import {useContext, useEffect, useState, useTransition} from "react";
import {GetCourseCodes, GetCourses, GetDayName, GetFacultyCodes} from "../CourseAPI";
import Spinner from "../Components/Spinner";
import Endpoints from "../Endpoints";
import CourseDetailsCard from "../Components/CourseDetailsCard";
import {FavouritesContext} from "../Services/FavouritesContext";
import IconButton from "../Components/IconButton";

export default function BrowsePage(props)
{
    const [courses, setCourses] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [majorCodes, setMajorCodes] = useState(null);
    const [courseCodes, setCourseCodes] = useState(null);
    const favouritesCtx = useContext(FavouritesContext);
    const favs = favouritesCtx.favourites;

    let {facultyCode, courseCode, ...params} = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        async function fetchCourses()
        {
            startTransition(async () => {
                const response = await GetCourses(facultyCode, "");
                if(response.ok)
                    setCourses(response.data);
            });
        }

        async function fetchCourseCodes()
        {
            const response = await GetCourseCodes(facultyCode);
            if(response.ok)
                setCourseCodes(response.data.sort());
        }

        async function fetchMajorCodes()
        {
            const response = await GetFacultyCodes();
            if(response.ok)
                setMajorCodes(response.data.sort());
        }

        fetchMajorCodes();

        if(facultyCode)
        {
            fetchCourses();
            fetchCourseCodes();
        }
    }, [facultyCode]);

    return <div>
        <h2 className="mb-3">Browse Courses</h2>
        <form className="row g-3 mb-3">
            <div className="col-md-3">
                <select className="form-select" onChange={(ev) => navigate(`/${Endpoints.Browse}/${ev.target.value}`)}
                        disabled={!majorCodes} value={facultyCode} required>
                    <option value="">Select a Major</option>
                    {majorCodes?.map(x => <option key={x} value={x}>{x}</option>)}
                </select>
            </div>
            <div className="col-md-3">
                <select className="form-select" onChange={(ev) => navigate(`/${Endpoints.Browse}/${facultyCode}/${ev.target.value}`)}
                        disabled={!courseCodes} value={courseCode ?? ""}>
                    <option value="">Get All</option>
                    {courseCodes?.map(x => <option key={x} value={x}>{x}</option>)}
                </select>
            </div>
            <div className="col-md-1">
                <IconButton className="btn btn-outline-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#filter" icon="filter_alt"></IconButton>
            </div>
            <div className="collapse" id="filter">
                <div className="col-md-3">
                    <select className="form-select" onChange={(ev) => setSearchParams(searchParams.toString())}>
                        <option value="">All</option>
                        <option value="yarak">First</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <select className="form-select" onChange={(ev) => setSearchParams({day: "2"}, {replace: false})}>
                        <option value="">All</option>
                        <option value="yarak">First</option>
                    </select>
                </div>
            </div>
        </form>
        {isPending && <Spinner className="mb-3 mx-auto text-primary"/>}
        <ul className="list-group">
            {courses?.filter(x => x.courseCode.includes(courseCode ?? "")).map(x => <a className="list-group-item list-group-item-action"
                                  key={x.crn} href={`/${Endpoints.Course}/${x.crn}`}>
                <CourseDetailsCard course={x} isFav={favs.includes(x.crn.toString())}/>
            </a>)}
        </ul>
    </div>;
}