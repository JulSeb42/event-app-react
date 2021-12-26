// Packages
import React, { useContext, useEffect, useState } from "react"
import Link from "../../components/utils/LinkScroll"
import axios from "axios"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
import Button from "../../components/ui/Button"
import List from "../../components/events/List"
import Card from "../../components/events/Card"
import Item from "../../components/layouts/Item"
import TitleButton from "../../components/layouts/TitleButton"
import CardProfile from "../../components/user/CardProfile"

const API_URL = "http://localhost:5005"

function MyAccount() {
    const { user } = useContext(AuthContext)
    const [allEvents, setAllEvents] = useState([])

    useEffect(() => {
        axios
            .get(`${API_URL}/events/events`)
            .then(res => setAllEvents(res.data))
    }, [])

    const organisedEvents = allEvents.filter(
        event => event.organiser._id === user._id
    )
    const invitedEvents = allEvents.filter(event =>
        event.invitedPeople.some(e => e._id === user._id)
    )

    return (
        <Page title={user.fullName}>
            <CardProfile user={user} welcome />

            <Font.P>
                <Link to={`/user/${user._id}`}>Check your public profile</Link>
            </Font.P>

            <TitleButton>
                <Font.H2>Events</Font.H2>

                <Button to="/events/new-event" btnstyle="primary">
                    Add a new event
                </Button>
            </TitleButton>

            <Item>
                <Font.H3>Your events</Font.H3>

                {organisedEvents.length > 0 ? (
                    <List>
                        {organisedEvents
                            .sort((a, b) => {
                                return (
                                    new Date(a.startDate) -
                                    new Date(b.startDate)
                                )
                            })
                            .map(event => (
                                <Card event={event} key={event._id} />
                            ))}
                    </List>
                ) : (
                    <Font.P>You did not organise any event yet!</Font.P>
                )}
            </Item>

            <Item>
                <Font.H3>Events you are invited to</Font.H3>

                {invitedEvents.length > 0 ? (
                    <List>
                        {invitedEvents
                            .sort((a, b) => {
                                return (
                                    new Date(a.startDate) -
                                    new Date(b.startDate)
                                )
                            })
                            .map(event => (
                                <Card event={event} key={event._id} />
                            ))}
                    </List>
                ) : (
                    <Font.P>You are not invited to any event yet!</Font.P>
                )}
            </Item>
        </Page>
    )
}

export default MyAccount
