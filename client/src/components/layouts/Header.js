// Packages
import React, { useContext, useState } from "react"
import { NavLink, useLocation, Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import {
    Variables,
    DropdownContainer,
    Dropdown,
    Hr,
    Form,
    Input,
    Icon,
} from "components-react-julseb"
import axios from "axios"

// Components
import { AuthContext } from "../../context/auth"
import ButtonAccount from "../ui/ButtonAccount"

// Data
import SiteData from "../data/SiteData"

// Styles
const Container = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${Variables.Margins.L} 5vw;
    background-color: ${Variables.Colors.Primary500};
`

const Burger = styled.button`
    display: none;

    @media ${Variables.Breakpoints.Mobile} {
        display: inline;
        position: relative;
        background: none;
        border: none;
        padding: 0;
        width: 30px;
        height: 20px;

        span {
            width: 100%;
            background-color: black;
            height: 2px;
            position: absolute;
            left: 0;
            transition: ${Variables.Transitions.Short};

            &:first-child {
                top: 0;
            }

            &:nth-child(2) {
                top: calc(50% - 2px / 2);
            }

            &:last-child {
                bottom: 0;
            }
        }

        &.open span {
            &:first-child {
                transform: rotate(45deg);
                top: 45%;
            }

            &:nth-child(2) {
                width: 0;
            }

            &:last-child {
                transform: rotate(-45deg);
                bottom: 45%;
            }
        }
    }
`

const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    @media ${Variables.Breakpoints.Mobile} {
        position: absolute;
        width: 100%;
        background-color: white;
        left: 0;
        top: -200px;
        padding: 0 5vw ${Variables.Margins.S} 5vw;
        flex-direction: column;
        align-items: flex-start;
        transition: ${Variables.Transitions.Short};

        &.open {
            top: 72px;
        }
    }

    & > *:not(:last-child) {
        margin-right: ${Variables.Margins.M};
    }

    & > a {
        color: ${Variables.Colors.White};
    }
`

const LinkNav = styled(NavLink)`
    color: ${Variables.Colors.White};
    font-family: ${Variables.FontFamilies.Body};
    font-size: ${Variables.FontSizes.Body};
    text-decoration: none;
    border: none;
    padding: 0;
    background: none;

    &.active {
        font-weight: ${Variables.FontWeights.Black};
    }
`

const Drawer = styled(Dropdown)`
    right: 0;
    left: inherit;
    background-color: ${Variables.Colors.Primary500};

    hr {
        width: 90%;
    }
`

const Search = styled(Form)``

const StyledLinkDropdown = styled(Link)`
    color: ${Variables.Colors.White} !important;
    background-color: ${Variables.Colors.Primary500} !important;
    display: inline-flex;
    align-items: center;
    border: none;
    font-size: ${Variables.FontSizes.Body};
    font-family: ${Variables.FontFamilies.Body};
    font-weight: ${Variables.FontWeights.Regular} !important;
    padding: ${Variables.Margins.XS};
    transition: ${Variables.Transitions.Short};

    &:hover {
        background-color: ${Variables.Colors.White} !important;
        color: ${Variables.Colors.Primary500} !important;
    }

    &.active {
        font-weight: ${Variables.FontWeights.Bold} !important;
    }

    & > span {
        margin-right: ${Variables.Margins.XXS};
    }
`

function ButtonNav(props) {
    return (
        <StyledLinkDropdown to={props.to} {...props}>
            <Icon name={props.icon} size={16} />

            {props.children}
        </StyledLinkDropdown>
    )
}

function Header() {
    const location = useLocation().pathname

    const { logoutUser, user } = useContext(AuthContext)

    // Burger
    const [isOpen, setIsOpen] = useState(false)
    const open = isOpen ? "open" : ""

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    // Search
    const navigate = useNavigate()

    const [search, setSearch] = useState("")

    const handleSearch = e => setSearch(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        axios
            .put(`/search/search/${search}`)
            .then(() => navigate(`/search/${search}`))
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <LinkNav as={Link} to="/">
                {SiteData.Name}
            </LinkNav>

            <Burger className={open} onClick={() => setIsOpen(!isOpen)}>
                <span />
                <span />
                <span />
            </Burger>

            <Nav className={open}>
                <Search onSubmit={handleSubmit}>
                    <Input
                        icon="search"
                        id="search"
                        placeholder="Search people or events"
                        onChange={handleSearch}
                        value={search}
                    />
                </Search>

                <LinkNav to="/">Home</LinkNav>

                <DropdownContainer>
                    <ButtonAccount
                        user={user}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    />

                    <Drawer className={isDropdownOpen ? "open" : ""}>
                        <ButtonNav
                            to="/my-account"
                            className={location === "/my-account" && "active"}
                            icon="user"
                        >
                            Profile
                        </ButtonNav>

                        <ButtonNav
                            to="/my-account/edit"
                            className={
                                location === "/my-account/edit" && "active"
                            }
                            icon="edit"
                        >
                            Edit account
                        </ButtonNav>

                        <Hr />

                        <ButtonNav
                            as="button"
                            to="/my-account"
                            onClick={logoutUser}
                            icon="logout"
                        >
                            Log out
                        </ButtonNav>
                    </Drawer>
                </DropdownContainer>
            </Nav>
        </Container>
    )
}

export default Header
