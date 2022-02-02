// Packages
import React, { useContext } from "react"
import { Font } from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"
import UserCard from "../../components/user/UserCard"

function MyAccount() {
    const { user } = useContext(AuthContext)

    return (
        <Page title={user.fullName}>
            <UserCard user={user} welcome />

            {!user.verified && <Font.P>Your account is not verified.</Font.P>}
        </Page>
    )
}

export default MyAccount
