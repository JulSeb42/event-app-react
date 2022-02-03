// Packages
import React from "react"
import styled, { css } from "styled-components"
import { Link } from "react-router-dom"
import {
    Variables,
    Font,
    Image,
    convertDateShort,
} from "components-react-julseb"

// Styles
const Container = styled(Link)`
    width: 100%;
    border: 1px solid ${Variables.Colors.Gray200};
    border-radius: ${Variables.Radiuses.M};
    display: grid;
    grid-template-columns: 100px 1fr;
    overflow: hidden;
    color: ${Variables.Colors.Black};
    text-decoration: none;
    transition: ${Variables.Transitions.Short};

    &:hover {
        transform: scale(1.01);
    }
`

const Img = styled(Image)`
    height: 150px;

    ${props =>
        props.empty &&
        css`
            background: ${Variables.Colors.Gray200};
        `}
`

const Content = styled.div`
    padding: ${Variables.Margins.S};
    align-content: center;
    display: grid;
    gap: ${Variables.Margins.XXS};
`

const Title = styled(Font.H4)`
    color: ${Variables.Colors.Primary500};
`

const Price = styled(Font.P)``

function CardEvent({ event }) {
    return (
        <Container to={`/events/${event._id}`}>
            {event.imageUrl ? (
                <Img src={event.imageUrl} alt={event.title} fit="cover" />
            ) : (
                <Img as="span" empty />
            )}

            <Content>
                <Title>{event.title}</Title>

                <Font.P>
                    <Font.Strong>{event.location}</Font.Strong>
                </Font.P>

                <Font.P>
                    {convertDateShort(event.startDate)} at {event.startTime}
                </Font.P>

                <Price>{event.price === 0 ? "Free" : `${event.price} €`}</Price>
            </Content>
        </Container>
    )
}

export default CardEvent
