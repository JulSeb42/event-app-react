// Packages
import React from "react"
import styled from "styled-components"

// Components
import Icon from "../ui/Icon"
import * as Variables from "../styles/Variables"

// Styles
const Container = styled.label`
    position: relative;
    width: 100%;
    height: 20vw;
    min-height: 300px;
    border-radius: ${Variables.Radiuses.XL};
    overflow: hidden;
    cursor: pointer;
`

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`

const Input = styled.input`
    display: none;
`

const IconContainer = styled.div`
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

function InputCover(props) {
    return (
        <Container htmlFor={props.id}>
            <Img src={props.src} alt={props.alt} />

            <Input type="file" id={props.id} {...props} />

            <IconContainer>
                <Icon
                    name="edit"
                    size={32}
                    color={Variables.Colors.BluePrimary}
                />
            </IconContainer>
        </Container>
    )
}

export default InputCover
