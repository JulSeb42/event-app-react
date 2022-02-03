// Packages
import React from "react"
import {
    MarkdownContainer as Container,
    Font,
    Image,
} from "components-react-julseb"
import { Link } from "react-router-dom"

const options = {
    forceBlock: true,

    wrapper: "div",

    overrides: {
        h1: {
            component: Font.H1,
        },

        h2: {
            component: Font.H2,
        },

        h3: {
            component: Font.H3,
        },

        h4: {
            component: Font.H4,
        },

        h5: {
            component: Font.H5,
        },

        h6: {
            component: Font.H6,
        },

        p: {
            component: Font.P,
        },

        strong: {
            component: Font.Strong,
        },

        em: {
            component: Font.Em,
        },

        ul: {
            component: Font.List,
        },

        small: {
            component: Font.Small,
        },

        Link: {
            component: Link,
        },

        img: {
            component: Image,
        },
    },
}

function MarkdownContainer(props) {
    return <Container options={options}>{props.children}</Container>
}

export default MarkdownContainer
