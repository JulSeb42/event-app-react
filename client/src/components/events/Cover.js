// Packages
import React from "react"

// Utils
import convertDate from "../utils/convertDate"

function Cover(props) {
    return (
        <div>
            <img src={props.event.imageUrl} alt={props.event.title} />

            <h1>{props.event.title}</h1>

            <p>
                From {convertDate(props.event.startDate)} at{" "}
                {props.event.startTime} to {convertDate(props.event.endDate)} at{" "}
                {props.event.endTime}
            </p>
        </div>
    )
}

export default Cover