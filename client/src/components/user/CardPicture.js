// Packages
import React from "react"
import styled from "styled-components"
import Link from "../utils/LinkScroll"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"

// Styles
const Container = styled(Link)`
    aspect-ratio: 1;
    overflow: hidden;
    width: 100%;
    border-radius: ${Variables.Radiuses.M};
    position: relative;
    color: ${Variables.Colors.White};
    text-decoration: none;
    transition: ${Variables.Transitions.Short};

    &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${Variables.Colors.Overlay};
        z-index: 1;
    }

    p {
        position: relative;
        z-index: 2;
        font-weight: ${Variables.FontWeights.Bold};
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        flex-direction: column;
        padding: ${Variables.Margins.XS};
    }

    &:hover {
        transform: scale(1.01);
    }
`

const Img = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    object-fit: cover;
`

function CardPicture(props) {
    return (
        <Container to={`/user/${props.user._id}`}>
            <Img src={props.user.imageUrl} alt={props.user.fullName} />

            <Font.P>{props.user.fullName}</Font.P>
        </Container>
    )
}

export default CardPicture
