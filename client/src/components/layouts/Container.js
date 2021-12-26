// Packages
import React from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"

// Styles
const Wrapper = styled.div`
    display: grid;
    grid-template-columns: ${Variables.Container.Template};
    padding: ${Variables.Container.Padding};

    @media ${Variables.Breakpoints.Tablet} {
        grid-template-columns: ${Variables.Container.TemplateTablet};
    }
`

const Content = styled.main`
    grid-column: 2;
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.L};
`

function Container(props) {
    return (
        <Wrapper>
            <Content>{props.children}</Content>
        </Wrapper>
    )
}

export default Container
