import React from 'react';
import {InfoRow} from "./InfoRow";

export class CourseInfo extends React.Component
{
    constructor(props) {
        super(props);
        this.course = this.props.course;
        this.isAvailable = this.course.capacity > this.course.enrolled;
    }

    render()
    {
        return <div>
            <div className="d-flex justify-content-between">
                <span className="fw-bold">{this.course.courseTitle}</span>
                <span className={`fw-bold ${this.isAvailable ? "text-success" : "text-danger"}`}>{this.course.enrolled}/{this.course.capacity}</span>
            </div>
            <hr/>
            <InfoRow title="Course Code:">{this.course.courseCode}</InfoRow>
            <InfoRow title="Instructor:">{this.course.instructors}</InfoRow>
            <InfoRow title="Building:">{this.course.building}</InfoRow>
            <InfoRow title="Time:">{this.course.time}</InfoRow>
            <InfoRow title="Room:">{this.course.room}</InfoRow>
        </div>;
    }
}