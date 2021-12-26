// Packages
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"

const List = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: ${Variables.Margins.S};
`

export default List