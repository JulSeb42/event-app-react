// Packages
import React from "react"
import styled from "styled-components"

// Styles
const Container = styled.img`
    --size: ${props => `${props.size}px`};
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    object-fit: cover;
`

function ProfilePicture(props) {
    return (
        <Container
            src={props.src}
            alt={props.alt}
            size={props.size || 100}
            {...props}
        />
    )
}

export default ProfilePicture
