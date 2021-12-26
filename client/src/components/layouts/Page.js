// Packages
import React, { useContext } from "react"
import { useLocation } from "react-router-dom"

// Components
import Helmet from "./Helmet"
import Header from "./Header"
import { AuthContext } from "../../context/auth"
import Container from "./Container"

function Page(props) {
    const location = useLocation().pathname
    const conditionLocation = location === "/login" || location === "/signup"
    const { isLoggedIn } = useContext(AuthContext)

    return (
        <>
            <Helmet
                title={props.title}
                description={props.description}
                keywords={props.keywords}
            />

            {!conditionLocation && isLoggedIn && <Header />}

            <Container>{props.children}</Container>
        </>
    )
}

export default Page
