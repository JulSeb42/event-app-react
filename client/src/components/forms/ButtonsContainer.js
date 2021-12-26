// Packages
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"

// Styles
const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    button:first-child {
        margin-right: ${Variables.Margins.XXS};
    }
`

export default ButtonsContainer
