// Packages
import React, { useState } from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"

// Styles
const Container = styled(Font.P)`
    max-height: calc(${Variables.FontSizes.Body} * ${Variables.LineHeight} * 5);
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;

    &.open {
        max-height: inherit;
        -webkit-line-clamp: inherit;
    }
`

const Button = styled.button`
    justify-self: start;
    border: none;
    padding: 0;
    background: none;
    color: ${Variables.Colors.BluePrimary};
    font-weight: ${Variables.FontWeights.Bold};
    font-size: ${Variables.FontSizes.Label};
    transition: ${Variables.Transitions.Short};

    &:hover {
        color: ${Variables.Colors.BluePrimary70};
    }
`

function Description(props) {
    const [isOpen, setIsOpen] = useState(false)
    const open = isOpen ? "open" : ""

    return (
        <>
            <Container className={open} bio>
                {props.children}
            </Container>

            <Button onClick={() => setIsOpen(!open)}>
                Read {isOpen ? "less" : "more"}
            </Button>
        </>
    )
}

export default Description
