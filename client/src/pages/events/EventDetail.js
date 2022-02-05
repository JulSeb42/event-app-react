// Packages
import React, { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
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
import PostForm from "../../components/event/PostForm"
import CardPost from "../../components/event/CardPost"

function EventDetail({ event }) {
    const { user } = useContext(AuthContext)

    const participants = event.invitedPeople.sort((a, b) =>
        a.fullName > b.fullName ? 1 : -1
    )

    // Get all posts
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        axios
            .get("/posts/posts")
            .then(res => setAllPosts(res.data))
            .catch(err => console.log(err))
    }, [])

    const filteredPosts = allPosts
        .filter(post => post.event._id === event._id)
        .sort((a, b) => new Date(a.datePosted) - new Date(b.datePosted))

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
                <Font.H4>Visibility</Font.H4>
                <Font.P>{event.isPrivate ? "Private" : "Public"}</Font.P>
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

            <Grid gap={Variables.Margins.M}>
                <Font.H4>Wall</Font.H4>

                <PostForm event={event} />

                <Grid gap={Variables.Margins.M}>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
                            <CardPost post={post} key={post._id} />
                        ))
                    ) : (
                        <Font.P>No post yet.</Font.P>
                    )}
                </Grid>
            </Grid>
        </Page>
    )
}

export default EventDetail
