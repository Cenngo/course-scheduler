import React from "react";

export class InfoRow extends React.Component
{
    render()
    {
        return <div className="d-flex justify-content-between w-50">
            <span className="fw-semibold">{this.props.title}</span>
            <span className="fw-light">{this.props.children}</span>
        </div>;
    }
}