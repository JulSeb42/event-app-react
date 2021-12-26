// Packages
import React from "react"
import { Helmet as HelmetMeta } from "react-helmet"

// Data
import SiteData from "../data/SiteData"

function Helmet(props) {
    return (
        <HelmetMeta>
            <title>
                {props.title} | {SiteData.Name}
            </title>
            <link rel="icon" href={`/images/${SiteData.Favicon}`} />
            <meta content="IE=edge" http-equiv="X-UA-Compatible" />
            <meta
                content="width=device-width, initial-scale=1"
                name="viewport"
            />
            <meta
                name="description"
                content={
                    props.description ? props.description : SiteData.Description
                }
            />
            <meta
                name="keywords"
                content={`${props.keywords}, ${SiteData.Keywords}`}
            />
            <meta name="author" content={SiteData.Author} />
            <meta property="og:title" content={props.title} />
            <meta property="og:type" content={SiteData.Type} />
            <meta property="og:image" content={SiteData.Cover} />
            <meta property="og:site_name" content={SiteData.Title} />
            <meta property="og:locale" content={SiteData.Language} />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossorigin
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap"
                rel="stylesheet"
            />
        </HelmetMeta>
    )
}

export default Helmet
