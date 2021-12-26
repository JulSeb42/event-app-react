// Packages
import React from "react"
import styled from "styled-components"

// Components
import ProfilePicture from "../user/ProfilePicture"
import Icon from "../ui/Icon"
import * as Variables from "../styles/Variables"

// Styles
const Container = styled.label`
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
`

const Input = styled.input`
    display: none;
`

const IconContainer = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    transition: ${Variables.Transitions.Short};

    &:hover {
        opacity: 0;
    }
`

function InputProfilePicture(props) {
    return (
        <Container htmlFor={props.id}>
            <ProfilePicture src={props.src} alt={props.alt} size={150} />

            <Input
                type="file"
                id={props.id}
                onChange={props.onChange}
                {...props}
            />

            <IconContainer>
                <Icon
                    name="edit"
                    color={Variables.Colors.BluePrimary}
                    size={24}
                />
            </IconContainer>
        </Container>
    )
}

export default InputProfilePicture
