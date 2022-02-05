// Packages
import React from "react"
import styled from "styled-components"
import { Loader, Variables } from "components-react-julseb"

// Styles
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${Variables.Margins.L} 0;
`

function LoaderContainer(props) {
    return (
        <Container>
            <Loader border={4} />
        </Container>
    )
}

export default LoaderContainer
