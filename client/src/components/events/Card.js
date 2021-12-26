// Packages
import React from "react"
import Link from "../utils/LinkScroll"
import styled, { css } from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"

// Utils
import convertDate from "../utils/convertDate"

// Styles
const Container = styled(Link)`
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid ${Variables.Colors.LightGray};
    border-radius: ${Variables.Radiuses.M};
    overflow: hidden;
    color: ${Variables.Colors.Black};
    transition: ${Variables.Transitions.Short};

    &:hover {
        transform: scale(1.01);
    }
`

const Img = styled.img`
    width: 150px;
    aspect-ratio: 1;
    ${'' /* margin-right: ${Variables.Margins.XS}; */}
    object-fit: cover;

    ${props => props.empty && css`
        background: ${Variables.Colors.Overlay};
    `}
`

const Content = styled.span`
    padding: ${Variables.Margins.XS};
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.XS};
`

const Title = styled(Font.H4)`
    color: ${Variables.Colors.BluePrimary};
`

const Location = styled(Font.P)`
    font-weight: ${Variables.FontWeights.Bold};
`

function Card(props) {
    return (
        <Container to={`/events/${props.event._id}`}>
            {props.event.imageUrl ? (
                <Img src={props.event.imageUrl} alt={props.event.title} />
            ) : (
                <Img as="span" empty />
            )}

            <Content>
                <Title>{props.event.title}</Title>
                <Location>{props.event.location}</Location>

                <Font.P>
                    {convertDate(props.event.startDate)} at{" "}
                    {props.event.startTime}
                </Font.P>
            </Content>
        </Container>
    )
}

export default Card
