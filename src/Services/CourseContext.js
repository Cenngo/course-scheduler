import {createContext, useContext, useEffect, useState} from "react";
import {useLocalStorage} from "./Hooks";

export const CourseContext = createContext(null);

export function useCourses()
{
    return useContext(CourseContext);
}

export function CourseContextProvider({children, ...props})
{
    const [storage, setStorage] = useLocalStorage();
    let courses = storage["courses"] ?? [];

    const addCourse = (crn) => {
        setStorage({courses: [crn, ...courses], ...storage});
    }
    const removeCourse = (crn) => {
        setStorage({courses: [...courses?.filter(x => x !== crn)], ...storage});
    }

    const clear = () => {
        setStorage({courses: []});
    }

    let value = {
        courses,
        addCourse,
        removeCourse,
        clear
    }

    return <CourseContext.Provider value={value} {...props}>
        {children}
    </CourseContext.Provider>;
}