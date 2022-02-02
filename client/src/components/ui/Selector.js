// Packages
import React from "react"
import styled from "styled-components"
import { Variables } from "components-react-julseb"

// Styles
const Select = styled.span`
    width: auto;
`

const Input = styled.input`
    display: none;

    &:checked ~ label {
        background-color: ${Variables.Colors.Primary500};
        color: ${Variables.Colors.White};

        &:hover {
            background-color: ${Variables.Colors.Primary300};
            color: ${Variables.Colors.White};
        }
    }
`

const Label = styled.label`
    cursor: pointer;
    background-color: ${Variables.Colors.Gray100};
    padding: ${Variables.Margins.XXS} ${Variables.Margins.S};
    border-radius: ${Variables.Radiuses.Round};
    transition: ${Variables.Transitions.Short};
    cursor: pointer;

    &:hover {
        background-color: ${Variables.Colors.Primary300};
        color: ${Variables.Colors.White};
    }
`

function Selector(props) {
    return (
        <Select>
            <Input type={props.type || "radio"} id={props.id} {...props} />
            <Label htmlFor={props.id}>{props.label}</Label>
        </Select>
    )
}

const SelectorContainer = styled.div`
    display: flex;
    align-items: center;

    & > span:not(:last-child) {
        margin-right: ${Variables.Margins.XS};
    }
`

export { SelectorContainer, Selector }
