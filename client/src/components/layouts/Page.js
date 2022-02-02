// Packages
import React from "react"
import { Helmet, Wrapper, Main } from "components-react-julseb"
import { useLocation } from "react-router-dom"

// Components
import Header from "./Header"

// Data
import SiteData from "../data/SiteData"

function Page(props) {
    const location = useLocation().pathname
    const conditionLocation =
        location === "/login" ||
        location === "/signup" ||
        location === "/goodbye"

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

            {!conditionLocation && <Header />}

            <Wrapper template={props.template}>
                <Main>{props.children}</Main>
            </Wrapper>
        </>
    )
}

export default Page
