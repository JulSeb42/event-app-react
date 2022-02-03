// Packages
import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { Variables, Image, Font } from "components-react-julseb"

// Styles
const Container = styled(Link)`
    position: relative;
    color: ${Variables.Colors.White};
    text-decoration: none;
    width: 100%;
    aspect-ratio: 1;
    border-radius: ${Variables.Radiuses.M};
    overflow: hidden;
    transition: ${Variables.Transitions.Short};

    &:hover {
        transform: scale(1.01);
    }

    &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${Variables.Overlays.Gradient.Black};
        z-index: 2;
    }
`

const Img = styled(Image)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
`

const Content = styled(Font.Strong)`
    position: relative;
    z-index: 3;
    color: ${Variables.Colors.White};
    display: grid;
    gap: ${Variables.Margins.XS};
    align-content: end;
    width: 100%;
    height: 100%;
    padding: ${Variables.Margins.XS};
`

function CardPicture({ user }) {
    return (
        <Container to={`/users/${user._id}`}>
            <Img src={user.imageUrl} alt={user.fullName} />

            <Content>{user.fullName}</Content>
        </Container>
    )
}

export default CardPicture
