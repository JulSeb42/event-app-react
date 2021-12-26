// Packages
import React from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"
import InputContainer from "./InputContainer"

// Styles
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    span:not(:last-child) {
        margin-right: ${Variables.Margins.XS};
    }
`

const Input = styled.input`
    display: none;

    &:checked ~ label {
        background-color: ${Variables.Colors.BluePrimary};
        color: ${Variables.Colors.White};

        &:hover {
            background-color: ${Variables.Colors.BluePrimary70};
        }
    }
`

const Label = styled(Font.Label)`
    background-color: ${Variables.Colors.BluePrimary10};
    border-radius: ${Variables.Radiuses.Round};
    padding: ${Variables.Margins.XXS} ${Variables.Margins.S};
    cursor: pointer;
    transition: ${Variables.Transitions.Short};
    color: ${Variables.Colors.Black};
    font-size: ${Variables.FontSizes.Body};

    &:hover {
        background-color: ${Variables.Colors.BluePrimary70};
        color: ${Variables.Colors.White};
    }
`

function SelectorContainer(props) {
    return (
        <InputContainer label={props.label}>
            <Container>{props.children}</Container>
        </InputContainer>
    )
}

function Selector(props) {
    return (
        <span>
            <Input id={props.id} name={props.name} {...props} />

            <Label htmlFor={props.id}>{props.label}</Label>
        </span>
    )
}

export { SelectorContainer, Selector }
