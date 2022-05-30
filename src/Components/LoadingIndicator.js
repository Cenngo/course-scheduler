import React from "react";

export class LoadingIndicator extends React.Component
{
    render()
    {
        return <div className="spinner-grow text-primary" role="status" aria-hidden="true">
            <span className="visually-hidden">Loading...</span>
        </div>;
    }
}