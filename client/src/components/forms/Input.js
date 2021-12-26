// Packages
import React, { useState } from "react"
import styled, { css } from "styled-components"

// Components
import InputContainer from "./InputContainer"
import Icon from "../ui/Icon"
import * as Variables from "../styles/Variables"

// Styles
const PasswordContainer = styled.div`
    width: 100%;
    position: relative;
    height: 29px;
`

const InputStyled = styled.input`
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

    &:focus {
        border-color: ${Variables.Colors.BluePrimary};
    }

    &:disabled {
        cursor: not-allowed;
        background-color: ${Variables.Colors.LightGray};
    }

    ${props =>
        props.dateBirth &&
        css`
            appearance: none;
            -webkit-appearance: none;

            &::-webkit-inner-spin-button,
            &::-webkit-calendar-picker-indicator {
                display: none;
                -webkit-appearance: none;
            }
        `}
`

const Button = styled.button`
    position: absolute;
    right: ${Variables.Margins.XS};
    top: 0;
    height: 29px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    background: none;
    z-index: 10;
`

function Input(props) {
    const [isVisible, setIsVisible] = useState(false)
    const visible = isVisible ? "text" : "password"

    return (
        <InputContainer label={props.label} htmlFor={props.id}>
            {props.inputtype === "password" ? (
                <PasswordContainer>
                    <InputStyled
                        id={props.id}
                        name={props.name || props.id}
                        type={visible}
                        {...props}
                    />

                    <Button
                        aria-label="Show / hide password"
                        onClick={() => setIsVisible(!isVisible)}
                        type="button"
                    >
                        <Icon
                            name={isVisible ? "show" : "show-slash"}
                            size={16}
                            color={Variables.Colors.BluePrimary}
                        />
                    </Button>
                </PasswordContainer>
            ) : (
                <InputStyled
                    id={props.id}
                    name={props.name || props.id}
                    {...props}
                />
            )}
        </InputContainer>
    )
}

export default Input
