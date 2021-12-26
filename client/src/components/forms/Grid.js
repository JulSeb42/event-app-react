// Packages
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${Variables.Margins.M};
`

export default Grid