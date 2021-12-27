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
            <SelectorContainer>
                <Selector
                    label="Future events"
                    id={props.idFutureEvents || "futureEvents"}
                    name={props.name || "events"}
                    type="radio"
                    onChange={handleVisibleFuture}
                    defaultChecked={true}
                />

                <Selector
                    label="Past events"
                    id={props.idPastEvents || "pastEvents"}
                    name={props.name || "events"}
                    type="radio"
                    onChange={handleVisiblePast}
                />
            </SelectorContainer>

            <Container visible={isVisibleFuture}>
                <Title>Future events</Title>

                {props.futureEvents.length > 0 ? (
                    <List>
                        {props.futureEvents
                            .filter(
                                event => new Date() < new Date(event.startDate)
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
                ) : (
                    <Font.P>No event yet!</Font.P>
                )}
            </Container>

            <Container visible={isVisiblePast}>
                <Title>Past events</Title>

                {props.pastEvents.length > 0 ? (
                    <List>
                        {props.events
                            .filter(
                                event => new Date() > new Date(event.startDate)
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
                ) : (
                    <Font.P>No event yet!</Font.P>
                )}
            </Container>
        </>
    )
}

export default Tabs
