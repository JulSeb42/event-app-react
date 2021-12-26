// Packages
import React from "react"
import Link from "../utils/LinkScroll"

function Card(props) {
    return (
        <Link to={`/events/${props.event._id}`}>
            <img src={props.event.imageUrl} alt={props.event.title} />

            <h4>{props.event.title}</h4>
            <p>{props.event.location}</p>
            <p>
                {props.event.startDate} at {props.event.startTime}
            </p>
        </Link>
    )
}

export default Card
