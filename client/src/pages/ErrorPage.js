// Packages
import React from "react"
import Link from "../components/utils/LinkScroll"

// Components
import Page from "../components/layouts/Page"
import * as Font from "../components/styles/Font"

function ErrorPage() {
    return (
        <Page title="Not found!">
            <Font.H1>Not found!</Font.H1>

            <Font.P>
                This page does not exist.{" "}
                <Link to="/">Go back to homepage</Link>
            </Font.P>
        </Page>
    )
}

export default ErrorPage
