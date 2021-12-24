// Packages
import React, { useContext } from "react"
import Link from "../../components/utils/LinkScroll"

// Components
import { AuthContext } from "../../context/auth"
import Button from "../../components/ui/Button"

// Utils
import convertDate from "../../components/utils/convertDate"

function MyAccount() {
    const { user } = useContext(AuthContext)
    return (
        <div>
            <img src={user.imageUrl} alt={user.fullName} />

            <h1>Welcome {user.fullName}</h1>

            <p>Born on {convertDate(user.dateBirth)}</p>

            {!user.bio || user.bio === "" ? (
                <p>You did not write a bio yet!</p>
            ) : (
                <p>{user.bio}</p>
            )}

            <div>
                <h2>Events</h2>

                <Button to="/events/new-event">Add a new event</Button>
            </div>

            <h3>Your events</h3>

            {!user.organisedEvent || user.organisedEvent.length === 0 ? (
                <p>You did not organise any event yet!</p>
            ) : (
                <ul>
                    {user.organisedEvent.map(event => (
                        <li key={event._id}>
                            <Link to={`/events/${event._id}`}>
                                {event.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            <h3>Events you are invited to</h3>

            {!user.invitedEvents || user.invitedEvents.length === 0 ? (
                <p>You are not invited to any event yet!</p>
            ) : (
                <ul>
                    {user.invitedEvents.map(event => (
                        <li key={event._id}>
                            <Link to={`/events/${event._id}`}>
                                {event.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default MyAccount
