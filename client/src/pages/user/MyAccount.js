// Packages
import React, { useContext, useState } from "react"
import {
    Font,
    TitleFlex,
    Button,
    TabsContainer,
    TabsButtonsContainer,
    TabsButton,
    TabsContent,
} from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"
import UserCard from "../../components/user/UserCard"

const datesEvents = ["All", "Future events", "Past events"]

function MyAccount() {
    const { user } = useContext(AuthContext)

    const [organisedActive, setOrganisedActive] = useState(0)

    return (
        <Page title={user.fullName}>
            <UserCard user={user} welcome />

            {!user.verified && <Font.P>Your account is not verified.</Font.P>}

            <TitleFlex>
                <Font.H2>Events</Font.H2>

                <Button to="/events/new-event">Add a new event</Button>
            </TitleFlex>

            <Font.H3>Events you organise</Font.H3>

            <TabsContainer>
                <TabsButtonsContainer col={datesEvents.length}>
                    {datesEvents.map((date, i) => (
                        <TabsButton
                            onClick={() => setOrganisedActive(i)}
                            className={organisedActive === i ? "active" : ""}
                            key={i}
                        >
                            {date}
                        </TabsButton>
                    ))}
                </TabsButtonsContainer>
            </TabsContainer>
        </Page>
    )
}

export default MyAccount
