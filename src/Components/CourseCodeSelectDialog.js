import {startTransition, useEffect, useState, useTransition} from "react";
import {GetCourseCodes, GetCourses, GetFacultyCodes} from "../CourseAPI";
import Endpoints from "../Endpoints";
import Spinner from "./Spinner";
import {useNavigate, Outlet, useParams, useSearchParams, createSearchParams} from "react-router-dom";
import endpoints from "../Endpoints";
import Modal from "./Modal";

export default function CourseCodeSelectDialog({...props})
{
    let navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const [facultyCodes, setFacultyCodes] = useState(null);
    const [courseCodes, setCourseCodes] = useState(null);
    const [courseCode, setCourseCode] = useState("");

    let facultyCode = params.get('facultyCode');

    useEffect(() => {
        async function fetch()
        {
            const response = await GetFacultyCodes();
            if(response.ok)
                setFacultyCodes(response.data);
        }

        fetch();
    },[]);

    useEffect(() => {
        async function fetch()
        {
            if(facultyCode)
            {
                const response = await GetCourseCodes(facultyCode);
                if(response.ok)
                    setCourseCodes(response.data);
            }
        }

        fetch();
    }, [facultyCode])

    function handleSubmit()
    {
        navigate({
            pathname: '../' + Endpoints.Modals.CoursePicker,
            search: createSearchParams({
                facultyCode,
                courseCode
            }).toString()
        });
    }

    return <Modal onSubmit={handleSubmit}>
        <form className="row g-3 mb-3" onSubmit={handleSubmit}>
            <select className="form-select" onChange={(ev) => setParams({facultyCode: ev.target.value})}
                    disabled={!facultyCodes} value={facultyCode ?? ""} id="facultyCode" required>
                <option value="">Select a Major</option>
                {facultyCodes?.sort().map(x => <option key={x} value={x}>{x}</option>)}
            </select>
            <select className="form-select" onChange={(ev) => setCourseCode(ev.target.value)}
                    disabled={!courseCodes} value={courseCode ?? ""} id="courseCode" required>
                <option value="">Select a Course Code</option>
                {courseCodes?.sort().map(x => <option key={x} value={x}>{x}</option>)}
            </select>
        </form>
    </Modal>;
}