// Packages
import React, { useContext } from "react"
import { Link } from "react-router-dom"
import {
    Font,
    TitleFlex,
    Button,
    Grid,
    Variables,
} from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"
import Cover from "../../components/event/Cover"
import MarkdownContainer from "../../components/ui/MarkdownContainer"
import CardPicture from "../../components/user/CardPicture"

function EventDetail({ event }) {
    const { user } = useContext(AuthContext)

    const participants = event.invitedPeople.sort((a, b) =>
        a.fullName > b.fullName ? 1 : -1
    )

    return (
        <Page title={event.title}>
            <Cover event={event} />

            <TitleFlex>
                <Font.P>
                    <Font.Strong>
                        Organised by{" "}
                        <Link to={`/users/${event.organiser._id}`}>
                            {event.organiser.fullName}
                        </Link>
                    </Font.Strong>
                </Font.P>

                {user._id === event.organiser._id && (
                    <Button to={`/events/${event._id}/edit`}>Edit event</Button>
                )}
            </TitleFlex>

            <Grid gap={Variables.Margins.XXS}>
                <Font.H4>Location</Font.H4>
                <Font.P>{event.location}</Font.P>
            </Grid>

            <Grid gap={Variables.Margins.XXS}>
                <Font.H4>Price</Font.H4>
                <Font.P>
                    {event.price === 0 ? "Free" : `${event.price} €`}
                </Font.P>
            </Grid>

            <Grid gap={Variables.Margins.XXS}>
                <Font.H4>About</Font.H4>
                {event.description ? (
                    <MarkdownContainer>{event.description}</MarkdownContainer>
                ) : (
                    <Font.P>This event does not have a description.</Font.P>
                )}
            </Grid>

            <Grid gap={Variables.Margins.XXS}>
                <Font.H4>Participants</Font.H4>

                {participants.length > 0 ? (
                    <Grid col={6} gap={Variables.Margins.S}>
                        {participants.map(user => (
                            <CardPicture user={user} key={user._id} />
                        ))}
                    </Grid>
                ) : event.organiser._id === user._id ? (
                    <Font.P>You did not invite anyone yet.</Font.P>
                ) : (
                    <Font.P>No participant yet</Font.P>
                )}
            </Grid>

            {/* <Grid gap={Variables.Margins.XXS}>
                <Font.H4>Wall</Font.H4>
            </Grid> */}
        </Page>
    )
}

export default EventDetail
