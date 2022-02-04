// Packages
import React, { useState, useEffect } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import { Aside, Main, Font, Grid, Variables } from "components-react-julseb"
import styled from "styled-components"

// Components
import Page from "../components/layouts/Page"
import ButtonFilterSearch from "../components/ui/ButtonFilterSearch"
import CardEvent from "../components/event/CardEvent"
import CardPicture from "../components/user/CardPicture"

// Styles
const AsideStyled = styled(Aside)`
    align-content: start;
`

const Filters = styled(Grid)`
    align-content: start;
`

function Search(props) {
    const location = useLocation().pathname
    const searchKeywords = location.split("/")[2].replace("%20", " ")

    const [active, setActive] = useState("events")

    const [allEvents, setAllEvents] = useState([])
    const [allPeople, setAllPeople] = useState([])

    useEffect(() => {
        axios
            .get("/events/events")
            .then(res => setAllEvents(res.data))
            .catch(err => console.log(err))
        axios
            .get("/users/user")
            .then(res => setAllPeople(res.data))
            .catch(err => console.log(err))
    }, [])

    let resultsEvents = allEvents.filter(
        event =>
            event.title.toLowerCase().includes(searchKeywords.toLowerCase()) ||
            event.location.toLowerCase().includes(searchKeywords.toLowerCase())
    )

    let resultsPeople = allPeople.filter(user =>
        user.fullName.toLowerCase().includes(searchKeywords.toLowerCase())
    )

    return (
        <Page title="Search" template="aside-left" gap={Variables.Margins.L}>
            <AsideStyled col={2}>
                <Filters gap={Variables.Margins.XS}>
                    <ButtonFilterSearch
                        icon="calendar"
                        className={active === "events" ? "active" : ""}
                        onClick={() => setActive("events")}
                    >
                        Events
                    </ButtonFilterSearch>

                    <ButtonFilterSearch
                        icon="user"
                        className={active === "people" ? "active" : ""}
                        onClick={() => setActive("people")}
                    >
                        People
                    </ButtonFilterSearch>
                </Filters>
            </AsideStyled>

            <Main col={3}>
                <Font.H1>Results for {searchKeywords}</Font.H1>

                {active === "events" ? (
                    resultsEvents.length > 0 ? (
                        <Grid gap={Variables.Margins.M}>
                            {resultsEvents.map(event => (
                                <CardEvent event={event} key={event._id} />
                            ))}
                        </Grid>
                    ) : (
                        <Font.P>Your search did not return any event.</Font.P>
                    )
                ) : resultsPeople.length > 0 ? (
                    <Grid col={6}>
                        {resultsPeople.map(user => (
                            <CardPicture user={user} key={user._id} />
                        ))}
                    </Grid>
                ) : (
                    <Font.P>Your search did not return any person.</Font.P>
                )}
            </Main>
        </Page>
    )
}

export default Search
