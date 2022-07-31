export async function GetCourseCodes(facultyCode)
{
    const response = await fetch(APIEndpoints.CourseCodes(facultyCode));
    if(!response.ok)
        return {ok: false, data: response.statusText};

    const data = await response.json();
    return {ok: true, data: data};
}

export async function GetFacultyCodes()
{
    const response = await fetch(APIEndpoints.FacultyCodes());
    if(!response.ok)
        return {ok: false, data: response.statusText};

    const data = await response.json();
    return {ok: true, data: data};
}

export async function GetCourses(facultyCode, courseCode)
{
    const response = await fetch(APIEndpoints.Courses(facultyCode, courseCode));
    if(!response.ok)
        return {ok: false, data: response.statusText};

    const data = await response.json();
    return {ok: true, data: data};
}

export async function GetCourseInfo(crn)
{
    const response = await fetch(APIEndpoints.CourseInfo(crn));
    if(!response.ok)
        return {ok: false, data: response.statusText};

    const data = await response.json();
    return {ok: true, data: data};
}

export async function GetLastUpdate()
{
    const response = await fetch()
}

export function GetDayName(day)
{
    switch (day)
    {
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
    }
    return "---";
}

const BaseUrl = "https://courseapi.cenngo.tech";

const APIEndpoints = {
    FacultyCodes: () => `${BaseUrl}/Courses/Codes`,
    CourseCodes: (facultyCode) => `${BaseUrl}/Courses/Codes/${facultyCode}`,
    Courses: (facultyCode, courseCode) => `${BaseUrl}/Courses/${facultyCode}/${courseCode}`,
    CourseInfo: (crn) => `${BaseUrl}/Courses/${crn}`,
    LastUpdate: () => `${BaseUrl}/Info/LastUpdate`,
    EntryCount: () => `${BaseUrl}/Info/LastUpdate`,
    Buildings: (includeCourses = false) => `${BaseUrl}/Buildings?includeCourses=${includeCourses}`,
    Building: (code, includeCourses = false) => `${BaseUrl}/Buildings/${code}?includeCourses=${includeCourses}`
};

export class CourseInfo
{

}

export class CourseTime
{
    startTime;
    endTime;
    dayOfWeek;
}

export class BuildingInfo
{
    code;
    name;

    constructor(model) {
        this.code = model.code;
        this.name = model.name;
    }
}