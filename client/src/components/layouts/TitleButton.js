// Packages
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"

// Styles
const TitleButton = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    h2,
    h3,
    p {
        margin-right: ${Variables.Margins.XS};
    }
`

export default TitleButton
