// Packages
import React, { useContext } from "react"
import Link from "../../components/utils/LinkScroll"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
import Button from "../../components/ui/Button"
import Item from "../../components/layouts/Item"
import Cover from "../../components/events/Cover"
import List from "../../components/user/List"
import CardPicture from "../../components/user/CardPicture"
import TitleButton from "../../components/layouts/TitleButton"
import Description from "../../components/events/Description"

function EventDetail(props) {
    const { user, isLoggedIn } = useContext(AuthContext)

    return (
        <Page title={props.event.title}>
            <Cover event={props.event} />

            <TitleButton>
                <Font.P>
                    Organised by{" "}
                    <Link to={`/user/${props.event.organiser._id}`}>
                        {props.event.organiser.fullName}
                    </Link>
                </Font.P>

                {isLoggedIn && user._id === props.event.organiser._id && (
                    <Button
                        to={`/events/${props.event._id}/edit`}
                        btnstyle="primary"
                    >
                        Edit event
                    </Button>
                )}
            </TitleButton>

            <Item>
                <Font.H2>Location</Font.H2>
                <Font.P>{props.event.location}</Font.P>
            </Item>

            <Item>
                <Font.H2>About</Font.H2>
                <Description>{props.event.description}</Description>
            </Item>

            <Item>
                <Font.H2>Participants</Font.H2>
                {!props.event.invitedPeople ||
                props.event.invitedPeople.length === 0 ? (
                    <Font.P>
                        {props.event.organiser._id === user._id
                            ? "You did not invite anyone yet!"
                            : "No participants yet."}
                    </Font.P>
                ) : (
                    <List>
                        {props.event.invitedPeople
                            .sort((a, b) => {
                                return a.fullName > b.fullName ? 1 : -1
                            })
                            .map(user => (
                                <CardPicture user={user} key={user._id} />
                            ))}
                    </List>
                )}
            </Item>

            {/* Wall */}
        </Page>
    )
}

export default EventDetail
