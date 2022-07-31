import {useParams} from "react-router-dom";
import {useEffect, useState, useTransition} from "react";
import {GetCourseInfo, GetCourses} from "../CourseAPI";
import Spinner from "../Components/Spinner";
import Endpoints from "../Endpoints";
import CourseDetailsCard from "../Components/CourseDetailsCard";
import Alert from "../Components/Alert";

export default function AlternateCoursesPage(props)
{
    let {crn, ...params} = useParams();
    const [courses, setCourses] = useState(null);
    const [refCourse, setRefCourse] = useState(null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        function filterTimes(reference, course)
        {
            if(reference.times?.length !== course.times?.length)
                return false;

            const predicate = (a, b) => a.startTime === b.startTime && a.endTime === b.endTime && a.dayOfWeek === b.dayOfWeek;

            for(const time of course.times)
            {
                if(!reference.times.some(x => predicate(time, x)))
                    return false;
            }

            return true;
        }

        async function fetchCourses()
        {
            startTransition(async () => {
                const reference = await getReference();
                if(!reference)
                    return;

                setRefCourse(reference);

                const response = await GetCourses(reference.facultyCode, reference.courseCode.substring(4));
                if(response.ok)
                {
                    const alternates = response.data.filter(x => filterTimes(reference, x)).filter(x => x.crn !== reference.crn);
                    setCourses(alternates);
                }
            });
        }

        async function getReference()
        {
            const response = await GetCourseInfo(crn);
            return response.ok ? response.data : null;
        }

        fetchCourses();
    }, [crn]);

    return !isPending && !!refCourse && !!courses ? <div>
            <h3 className="mb-5">Showing alternative courses for {refCourse?.crn}</h3>
            <ul className="list-group">
                {courses?.length === 0 ? <Alert className="alert-info" icon="info">
                        No courses were found
                    </Alert>
                    : courses?.map(x => <a className="list-group-item list-group-item-action"
                                           key={x.crn} href={`/${Endpoints.Course}/${x.crn}`}>
                        <CourseDetailsCard course={x}/>
                </a>)}
            </ul>
        </div> :
        <Spinner className="mb-3 mx-auto text-primary"/>;
}