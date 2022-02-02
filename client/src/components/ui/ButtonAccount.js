// Packages
import React, { useContext } from "react"
import styled from "styled-components"
import { Variables, Avatar, getFirstName } from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"

// Styles
const Container = styled.button`
    display: flex;
    align-items: center;
    border: none;
    padding: 0;
    background: none;
    font-size: ${Variables.FontSizes.Body};
    font-family: ${Variables.FontFamilies.Body};
    color: ${Variables.Colors.White};

    & > span {
        margin-right: ${Variables.Margins.XS};
    }
`

function ButtonAccount(props) {
    const { isLoggedIn } = useContext(AuthContext)
    return (
        <Container {...props}>
            <Avatar
                src={isLoggedIn && props.user.imageUrl}
                alt={isLoggedIn && props.user.fullName}
                size={32}
            />

            {isLoggedIn && getFirstName(props.user.fullName)}
        </Container>
    )
}

export default ButtonAccount
