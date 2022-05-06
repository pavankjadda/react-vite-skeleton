import React from "react";

export default function Unauthorized(): JSX.Element {
    return (
        <div>
            <h2 className="text-danger">
                You are not authorized to view this page
            </h2>
        </div>
    );
}
