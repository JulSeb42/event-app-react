// Packages
import React from "react"
import styled from "styled-components"

// Components
import Button from "../ui/Button"
import * as Variables from "../styles/Variables"
import ButtonsContainer from "./ButtonsContainer"

// Styles
const Container = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.M};
`

function Form(props) {
    return (
        <Container {...props}>
            {props.children}

            <ButtonsContainer>
                {props.btnPrimary && (
                    <Button type="submit" isLoading={props.isLoading} btnstyle="primary">{props.btnPrimary}</Button>
                )}

                {props.btnCancel && (
                    <Button to={props.btnCancel} btnstyle="secondary">Cancel</Button>
                )}
            </ButtonsContainer>
        </Container>
    )
}

export default Form
