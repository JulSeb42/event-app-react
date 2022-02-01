// Packages
import React, { useContext } from "react"
import { Font, LinkScroll as Link, getFirstName } from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"

function MyAccount() {
    const { user } = useContext(AuthContext)

    return (
        <Page title={user.fullName}>
            <Font.H1>Hello {getFirstName(user.fullName)}</Font.H1>

            {!user.verified && <Font.P>Your account is not verified.</Font.P>}

            <Font.P>
                <Link to="/my-account/edit">Edit your account.</Link>
            </Font.P>
        </Page>
    )
}

export default MyAccount
