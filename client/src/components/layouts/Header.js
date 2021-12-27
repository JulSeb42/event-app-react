// Packages
import React, { useContext, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"

// Components
import { AuthContext } from "../../context/auth"
import ProfilePicture from "../user/ProfilePicture"
import * as Variables from "../styles/Variables"

// Styles
const Container = styled.header`
    width: 100%;
    padding: ${Variables.Margins.M} 5vw;
    background-color: ${Variables.Colors.BluePrimary};
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
`

const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    a {
        margin-right: ${Variables.Margins.L};
    }
`

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: ${Variables.Colors.White};
    text-decoration: none;
    font-weight: ${Variables.FontWeights.Regular};
    transition: ${Variables.Transitions.Short};
    background: none;
    border: none;
    padding: 0;
    font-size: ${Variables.FontSizes.Body};
    font-family: ${Variables.FontFamily};

    img {
        margin-right: ${Variables.Margins.XXS};
    }

    &:hover {
        color: ${Variables.Colors.BluePrimary50};
    }
`

const Logo = styled(Link)`
    color: ${Variables.Colors.White};
    text-decoration: none;
    font-weight: ${Variables.FontWeights.Bold};
    font-size: ${Variables.FontSizes.Body};
    font-family: ${Variables.FontFamily};
    transition: ${Variables.Transitions.Short};

    &:hover {
        color: ${Variables.Colors.BluePrimary50};
    }
`

const LinkStyled = styled(Link)`
    color: ${Variables.Colors.White};
    text-decoration: none;
    font-weight: ${Variables.FontWeights.Regular};
    transition: ${Variables.Transitions.Short};
    background: none;
    border: none;
    padding: 0;
    font-size: ${Variables.FontSizes.Body};
    font-family: ${Variables.FontFamily};

    &:hover {
        color: ${Variables.Colors.BluePrimary50};
    }

    &.active {
        font-weight: ${Variables.FontWeights.Bold};
    }
`

const Drawer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    position: absolute;
    right: 5vw;
    top: 50px;
    background: ${Variables.Colors.BluePrimary};
    padding: 0 ${Variables.Margins.S};
    border-radius: ${Variables.Radiuses.M};
    max-height: 0;
    overflow: hidden;
    transition: ${Variables.Transitions.Short};
    z-index: 999;

    a {
        margin-right: 0;

        &:not(:last-child) {
            margin-bottom: ${Variables.Margins.XXS};
        }
    }

    hr {
        width: 100%;
        margin-bottom: ${Variables.Margins.XXS};
    }

    &.open {
        max-height: 300px;
        padding: ${Variables.Margins.S};
    }
`

function Header() {
    const { logoutUser, user } = useContext(AuthContext)

    const [isOpen, setIsOpen] = useState(false)
    const open = isOpen ? "open" : ""

    const location = useLocation().pathname

    return (
        <Container>
            <Logo to="/">Event app</Logo>

            <Nav>
                <LinkStyled to="/" className={location === "/" && "active"}>Home</LinkStyled>

                <Button onClick={() => setIsOpen(!isOpen)}>
                    <ProfilePicture
                        src={user.imageUrl}
                        alt={user.fullName}
                        size={32}
                    />

                    <span>{user.fullName}</span>
                </Button>

                <Drawer className={open}>
                    <LinkStyled
                        to="/my-account"
                        className={location === "/my-account" && "active"}
                    >
                        Profile
                    </LinkStyled>

                    <LinkStyled
                        to="/my-account/edit"
                        className={location === "/my-account/edit" && "active"}
                    >
                        Edit account
                    </LinkStyled>

                    <hr />

                    <LinkStyled as="button" onClick={logoutUser}>
                        Log out
                    </LinkStyled>
                </Drawer>
            </Nav>
        </Container>
    )
}

export default Header
