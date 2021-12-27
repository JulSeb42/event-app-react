// Packages
import React, { useState } from "react"
import styled from "styled-components"

// Components
import { SelectorContainer, Selector } from "../forms/Selector"
import * as Font from "../styles/Font"
import * as Variables from "../styles/Variables"
import List from "../events/List"
import Card from "../events/Card"

// Styles
const Container = styled.div`
    display: ${props => (props.visible ? "block" : "none")};
`

const Title = styled(Font.H4)`
    margin-bottom: ${Variables.Margins.M};
`

function Tabs(props) {
    const [isVisibleFuture, setIsVisibleFuture] = useState(true)
    const [isVisiblePast, setIsVisiblePast] = useState(false)

    const handleVisibleFuture = e => {
        if (e.target.checked) {
            setIsVisibleFuture(true)
            setIsVisiblePast(false)
        }
    }

    const handleVisiblePast = e => {
        if (e.target.checked) {
            setIsVisibleFuture(false)
            setIsVisiblePast(true)
        }
    }

    return (
        <>
            {props.allEvents.length === 0 ? (
                <Font.P>No event yet!</Font.P>
            ) : props.pastEvents.length === 0 ? (
                <List>
                    {props.futureEvents
                        .sort((a, b) => {
                            return new Date(a.startDate) - new Date(b.startDate)
                        })
                        .map(event => (
                            <Card event={event} key={event._id} />
                        ))}
                </List>
            ) : props.futureEvents.length === 0 ? (
                <List>
                    {props.pastEvents
                        .sort((a, b) => {
                            return new Date(a.startDate) - new Date(b.startDate)
                        })
                        .map(event => (
                            <Card event={event} key={event._id} />
                        ))}
                </List>
            ) : (
                <>
                    <SelectorContainer>
                        <Selector
                            label="Future events"
                            id="futureEvents"
                            name="events"
                            type="radio"
                            onChange={handleVisibleFuture}
                            defaultChecked={true}
                        />

                        <Selector
                            label="Past events"
                            id="pastEvents"
                            name="events"
                            type="radio"
                            onChange={handleVisiblePast}
                        />
                    </SelectorContainer>

                    <Container visible={isVisibleFuture}>
                        <Title>Future events</Title>

                        <List>
                            {props.events
                                .filter(
                                    event =>
                                        new Date() < new Date(event.startDate)
                                )
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
                    </Container>

                    <Container visible={isVisiblePast}>
                        <Title>Past events</Title>

                        <List>
                            {props.events
                                .filter(
                                    event =>
                                        new Date() > new Date(event.startDate)
                                )
                                .sort((a, b) => {
                                    return (
                                        new Date(b.startDate) -
                                        new Date(a.startDate)
                                    )
                                })
                                .map(event => (
                                    <Card event={event} key={event._id} />
                                ))}
                        </List>
                    </Container>
                </>
            )}
        </>
    )
}

export default Tabs
