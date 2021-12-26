// Packages
import React from "react"
import styled from "styled-components"

// Components
import * as Font from "../styles/Font"
import * as Variables from "../styles/Variables"

// Styles
const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.XXS};
    position: relative;
`

function InputContainer(props) {
    return (
        <Container {...props}>
            {props.label && (
                <Font.Label
                    color={Variables.Colors.BluePrimary}
                    weight={Variables.FontWeights.Bold}
                    htmlFor={props.htmlFor}
                    big
                >
                    {props.label}
                </Font.Label>
            )}

            {props.children}
        </Container>
    )
}

export default InputContainer
