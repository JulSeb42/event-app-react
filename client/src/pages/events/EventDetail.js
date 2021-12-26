// Packages
import React, { useContext } from "react"
import Link from "../../components/utils/LinkScroll"

// Components
import { AuthContext } from "../../context/auth"
import Button from "../../components/ui/Button"

function EventDetail(props) {
    const { user, isLoggedIn } = useContext(AuthContext)

    return (
        <div>
            <img src={props.event.imageUrl} alt={props.event.title} />

            <h1>{props.event.title}</h1>

            <p>
                From {props.event.startDate} at {props.event.startTime} to{" "}
                {props.event.endDate} at {props.event.endTime}
            </p>

            <p>
                Organised by{" "}
                <Link to={`/user/${props.event.organiser._id}`}>
                    {props.event.organiser.fullName}
                </Link>
            </p>

            {isLoggedIn && user._id === props.event.organiser._id && (
                <Button to={`/events/${props.event._id}/edit`}>
                    Edit event
                </Button>
            )}

            <h2>Location</h2>
            <p>{props.event.location}</p>

            <h2>About</h2>
            <p>{props.event.description}</p>

            <h2>Participants</h2>
            {!props.event.invitedPeople ||
            props.event.invitedPeople.length === 0 ? (
                <p>
                    {props.event.organiser._id === user._id
                        ? "You did not invite anyone yet!"
                        : "No participants yet."}
                </p>
            ) : (
                <ul>
                    {props.event.invitedPeople.map(user => (
                        <li key={user._id}>
                            <Link to={`/user/${user._id}`}>
                                {user.fullName}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            {/* Wall */}
        </div>
    )
}

export default EventDetail
