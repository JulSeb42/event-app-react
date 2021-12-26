// Packages
import React from "react"
import Link from "../utils/LinkScroll"
import styled, { css } from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import Loader from "./Loader"

// Styles
const Container = styled.button`
    border: none;
    background: none;
    text-decoration: none;
    font-size: ${Variables.FontSizes.Body};
    font-weight: ${Variables.FontWeights.Bold};
    transition: ${Variables.Transitions.Short};
    justify-self: ${props => props.justify};
    padding: ${Variables.Margins.XS} ${Variables.Margins.S};
    border-radius: ${Variables.Radiuses.M};

    ${props =>
        props.btnstyle === "primary" &&
        css`
            background-color: ${Variables.Colors.BluePrimary};
            color: ${Variables.Colors.White};
            display: flex;
            align-items: center;

            &:hover {
                background-color: ${Variables.Colors.BluePrimary70};
            }

            &:disabled {
                background-color: ${Variables.Colors.LightGray};
                color: ${Variables.Colors.DarkGray};
                cursor: not-allowed;

                span {
                    margin-left: ${Variables.Margins.XS};
                }
            }
        `}

    ${props =>
        props.btnstyle === "secondary" &&
        css`
            color: ${Variables.Colors.BluePrimary};

            &:hover {
                color: ${Variables.Colors.BluePrimary70};
            }
        `}
    
    ${props =>
        props.btnstyle === "danger" &&
        css`
            background-color: ${Variables.Colors.Danger};
            color: ${Variables.Colors.White};

            &:hover {
                background-color: ${Variables.Colors.Danger70};
            }
        `}
`

function Button(props) {
    return (
        <Container
            as={props.to && Link}
            to={props.to}
            disabled={props.isLoading && "disabled"}
            {...props}
        >
            {props.children}

            {props.isLoading && (
                <Loader spinnerColor={Variables.Colors.DarkGray} />
            )}
        </Container>
    )
}

export default Button
