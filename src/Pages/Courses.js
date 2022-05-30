import React from 'react';
import {LoadingIndicator} from "../Components/LoadingIndicator";
import {CourseInfo} from "../Components/CourseInfo";

export class Courses extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
          courses: [],
          isLoaded: false,
          isLoading: false,
          facultyCode: "",
          courseCode: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render()
    {
        return <div className="container">
            <form role="search" onSubmit={this.handleSubmit} className="mb-5">
                <div className="row mb-2">
                    <div className="col-md-3 mb-2 mb-md-0">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="facultyCode" placeholder="EHB" value={this.state.facultyCode} onChange={this.handleChange}/>
                            <label form="floatingFacultyCode">Faculty Code</label>
                        </div>
                    </div>
                    <div className="col-md-3 mb-2 mb-md-0">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="courseCode" placeholder="101" value={this.state.courseCode} onChange={this.handleChange}/>
                            <label form="floatingCourseCode">Course Code</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 d-flex align-items-center">
                        <button type="submit" className="btn btn-primary me-3">Update</button>
                        {this.state.isLoading && <LoadingIndicator/>}
                    </div>
                </div>
            </form>
            {this.state.isLoaded && <ul id="courses" className="list-group mx-auto">
                {this.state.courses.map((course) => <li key={course.id} className="list-group-item">
                    <CourseInfo course={course}></CourseInfo>
                </li>)}
            </ul>}
        </div>;
    }

    updateData()
    {
        this.setState({isLoading: true});
        fetch(`https://courseapi.cenngo.tech/Courses/${this.state.facultyCode}/${this.state.courseCode}`)
            .then(response => response.json())
            .then(data => this.setState({courses: data, isLoaded: true, isLoading: false}));
    }

    handleChange(event)
    {
        this.setState({[event.target.id]: event.target.value})
    }

    handleSubmit(event)
    {
        this.updateData();
        event.preventDefault();
    }
}