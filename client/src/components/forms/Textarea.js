// Packages
import React from "react"
import styled, { css } from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import InputContainer from "./InputContainer"

// Styles
const Input = styled.textarea`
    width: 100%;
    border: 1px solid ${Variables.Colors.LightGray};
    transition: ${Variables.Transitions.Short};
    border-radius: ${Variables.Radiuses.S};
    padding: ${Variables.Margins.XXS} ${Variables.Margins.XS};
    color: ${Variables.Colors.Black};
    position: relative;
    z-index: 2;
    font-size: ${Variables.FontSizes.Body};
    font-family: ${Variables.FontFamily};
    min-height: calc(
        ${Variables.Margins.XXS} * 2 + 5 * 1.5 * ${Variables.FontSizes.Body}
    );

    &:focus {
        border-color: ${Variables.Colors.BluePrimary};
    }

    ${props =>
        props.counter &&
        css`
            min-height: inherit !important;
            height: calc(
                ${Variables.FontSizes.Body} * ${Variables.LineHeight} * 3 +
                    (${Variables.Margins.XXS} * 2)
            );
        `}
`

const Counter = styled.p`
    font-size: ${Variables.FontSizes.Label};
    color: ${Variables.Colors.Gray};
    font-style: italic;
`

function Textarea(props) {
    return (
        <InputContainer label={props.label} htmlFor={props.id}>
            <Input
                name={props.name || props.id}
                id={props.id}
                value={props.value}
                maxLength={props.counter}
                {...props}
            >
                {props.value}
            </Input>

            {props.counter && (
                <Counter>
                    {props.value.length}/{props.counter}
                </Counter>
            )}
        </InputContainer>
    )
}

export default Textarea
