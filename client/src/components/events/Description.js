// Packages
import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"

const maxHeight = 90

// Styles
const Container = styled(Font.P)`
    max-height: 100px;
    overflow: hidden;

    &.open {
        max-height: inherit;
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
    const [bioHeight, setBioHeight] = useState(undefined)

    // const height = createRef()
    // console.log(height)
    const ref = useRef()

    useEffect(() => {
        setBioHeight(ref.current.clientHeight)
        // console.log("useEffect", {
        //     ref,
        //     current: ref.current,
        //     clientHeight: ref.current.clientHeight,
        // })
    }, [])

    return (
        <>
            <Container className={open} bio ref={ref}>
                {props.children}
            </Container>

            {bioHeight > maxHeight && (
                <Button onClick={() => setIsOpen(!open)}>
                    Read {isOpen ? "less" : "more"}
                </Button>
            )}
        </>
    )
}

export default Description
