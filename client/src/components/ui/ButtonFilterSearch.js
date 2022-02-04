// Packages
import React from "react"
import styled from "styled-components"
import { Variables, Icon } from "components-react-julseb"

// Styles
const Container = styled.button`
    display: flex;
    align-items: center;
    padding: 0;
    border: none;
    background: none;
    font-weight: ${Variables.FontWeights.Bold};
    font-family: ${Variables.FontFamilies.Body};
    transition: ${Variables.Transitions.Short};

    &:hover {
        color: ${Variables.Colors.Primary500};
    }

    &.active .square {
        background-color: ${Variables.Colors.Primary500};
    }
`

const Square = styled.span`
    width: 4px;
    background-color: transparent;
    height: 100%;
    display: block;
    margin-right: ${Variables.Margins.XXS};
`

const Content = styled.span`
    display: flex;
    align-items: center;
    flex-grow: 1;
    font-size: ${Variables.FontSizes.Body};

    & > span {
        margin-right: ${Variables.Margins.XXS};
    }
`

function ButtonFilterSearch(props) {
    return (
        <Container {...props}>
            <Square className="square" />

            <Content>
                <Icon name={props.icon} size={16} />

                {props.children}
            </Content>
        </Container>
    )
}

export default ButtonFilterSearch
