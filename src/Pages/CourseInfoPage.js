import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {GetCourseInfo} from "../CourseAPI";
import Spinner from "../Components/Spinner";
import CourseDetailsCard from "../Components/CourseDetailsCard";
import Endpoints from "../Endpoints";
import IconLinkButton from "../Components/IconLinkButton";
import {FavouritesContext} from "../Services/FavouritesContext";
import IconButton from "../Components/IconButton";
import Toast from "../Components/Toast";
import {AlertsContext, AlertTypes} from "../Services/AlertsContext";

export default function CourseInfoPage(props)
{
    let params = useParams();
    let navigate = useNavigate();
    let [courseInfo, setCourseInfo] = useState();
    let favouritesCtx = useContext(FavouritesContext);
    let alertsCtx = useContext(AlertsContext);
    const favourites = favouritesCtx.favourites;

    useEffect(() => {
        async function fetchData()
        {
            let response = await GetCourseInfo(params.crn);
            if(response.ok)
                setCourseInfo(response.data);
        }
        fetchData();
    }, [params]);

    function parseClassRestriction()
    {
        let result = [];

        if(courseInfo.classRestriction & 1 << 1)
            result.push("Year 1");
        if(courseInfo.classRestriction & 1 << 2)
            result.push("Year 2");
        if(courseInfo.classRestriction & 1 << 3)
            result.push("Year 3");
        if(courseInfo.classRestriction & 1 << 4)
            result.push("Year 4");

        if(result.length == 0)
            result.push("None");

        return result;
    }

    return !courseInfo ? <Spinner className="mx-auto text-primary"/> : <CourseDetailsCard course={courseInfo}>
        <div className="row mb-3">
            <div className="col-md-4">
                <h5>Class Restrictions</h5>
                <span>{parseClassRestriction().join(' , ')}</span>
            </div>
            <div className="col-md-4">
                <h5>Teaching Method</h5>
                <span>{!courseInfo.teachingMethod ? "N/A" : courseInfo.teachingMethod}</span>
            </div>
        </div>
        <div className="row mb-3">
            <h5>Major Restrictions</h5>
            <span>{courseInfo.majorRestrictions?.join(' , ')}</span>
        </div>
        <div className="row mb-3">
            <h5>Prerequisites</h5>
            <div>
                <ul className="list-group">
                    {courseInfo.prerequisites?.map((or, index) => <li className="list-group-item" key={index}>
                        {or?.join(' , ').replace(/\(|\)/gm, '')}
                    </li> )}
                </ul>
            </div>
        </div>
        <div className="row mb-3">
            <h5>Major Reservations</h5>
            <span>{courseInfo.majorReservations}</span>
        </div>
        <div className="row mb-3 gap-2">
            <div>
                <IconLinkButton className="btn btn-info me-1 mb-2" to={`/${Endpoints.AlternateCourses}/${courseInfo.crn}`} icon="swap_horiz">Show Alternatives</IconLinkButton>
                <br/>
                {!favourites?.includes(params.crn) ?
                    <IconButton className="btn text-white mb-2" icon="favorite" style={{backgroundColor: "var(--bs-pink)"}} onClick={() => {
                        favouritesCtx.addFavourite(params.crn);
                        alertsCtx.addAlert("Successfully added to favourites.", AlertTypes.Success);
                    }}>
                        Add to Favourites
                    </IconButton> :
                    <IconButton className="btn text-white mb-2" icon="remove" style={{backgroundColor: "var(--bs-pink)"}} onClick={() => {
                        favouritesCtx.removeFavourite(params.crn);
                        alertsCtx.addAlert("Successfully removed from favourites.", AlertTypes.Success);
                    }}>
                        Remove from Favourites
                    </IconButton>
                }
            </div>
        </div>

    </CourseDetailsCard>;
}