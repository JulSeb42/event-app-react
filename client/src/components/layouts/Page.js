// Packages
import React, { useContext } from "react"
import { Helmet, Wrapper, Main } from "components-react-julseb"
import styled from "styled-components"

// Components
import { AuthContext } from "../../context/auth"
import Header from "./Header"

// Data
import SiteData from "../data/SiteData"

const Container = styled(Wrapper)`
    gap: ${props => props.gap};
    align-content: start;
`

function Page(props) {
    const { isLoggedIn } = useContext(AuthContext)

    return (
        <>
            <Helmet
                title={`${props.title} | ${SiteData.Name}`}
                description={props.description}
                keywords={props.keywords}
                siteName={SiteData.Name}
                favicon={SiteData.Favicon}
                author={SiteData.Author}
                type={SiteData.Type}
                cover={props.cover || SiteData.Cover}
                language={SiteData.Language}
            />

            {isLoggedIn && <Header />}

            <Container template={props.template} gap={props.gap}>
                {props.template === "aside-left" ? (
                    props.children
                ) : (
                    <Main>{props.children}</Main>
                )}
            </Container>
        </>
    )
}

export default Page
