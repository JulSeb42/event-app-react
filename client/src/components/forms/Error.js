// Packages
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"

// Styles
const Error = styled(Font.P)`
    background-color: ${Variables.Colors.Danger10};
    border: 1px solid ${Variables.Colors.Danger};
    padding: ${Variables.Margins.M};
    border-radius: ${Variables.Radiuses.M};
`

export default Error
