// Packages
import React, { useContext } from "react"
import Link from "../../components/utils/LinkScroll"

// Components
import { AuthContext } from "../../context/auth"
import ProfilePicture from "../../components/user/ProfilePicture"

// Utils
import convertDate from "../../components/utils/convertDate"

function PublicProfile(props) {
    const { user } = useContext(AuthContext)

    return (
        <div>
            <ProfilePicture
                src={props.user.imageUrl}
                alt={props.user.fullName}
                size={200}
            />

            <h1>{props.user.fullName}</h1>

            {props.user._id === user._id && (
                <p>
                    <Link to="/my-account">Back to your account</Link>
                </p>
            )}

            <p>Born on {convertDate(props.user.dateBirth)}</p>

            {!props.user.bio ? (
                <p>{props.user.fullName} did not write a bio yet!</p>
            ) : (
                <p>{props.user.bio}</p>
            )}

            <h2>Events</h2>

            <h3>
                {props.user.gender === "man"
                    ? "His"
                    : props.user.gender === "woman"
                    ? "Her"
                    : "Their"}{" "}
                events
            </h3>

            {!props.user.organisedEvents ||
            props.user.organisedEvents.length === 0 ? (
                <p>{props.user.fullName} did not organise any event yet!</p>
            ) : (
                <ul>
                    {props.user.organisedEvents.map(event => (
                        <li key={event._id}>
                            <Link to={`/events/${event._id}`}>
                                {event.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            <h3>
                Events{" "}
                {props.user.gender === "man"
                    ? "he is"
                    : props.user.gender === "woman"
                    ? "she is"
                    : "they are"}{" "}
                invited to
            </h3>

            {!props.user.invitedEvents ||
            props.user.organisedEvents.length === 0 ? (
                <p>{props.user.fullName} is not invited to any event yet!</p>
            ) : (
                <ul>
                    {props.user.invitedEvents.map(
                        event =>
                            event.visible && (
                                <li>
                                    <Link to={`/events/${event._id}`}>
                                        {event.title}
                                    </Link>
                                </li>
                            )
                    )}
                </ul>
            )}
        </div>
    )
}

export default PublicProfile
