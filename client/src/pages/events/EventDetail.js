// Packages
import React from "react"
import { Font } from "components-react-julseb"

// Components
import Page from "../../components/layouts/Page"

function EventDetail({ event }) {
    return (
        <Page title={event.title}>
            <Font.H1>{event.title}</Font.H1>
        </Page>
    )
}

export default EventDetail
