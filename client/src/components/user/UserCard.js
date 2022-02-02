// Packages
import React from "react"
import styled from "styled-components"
import {
    Variables,
    Font,
    getFirstName,
    Avatar,
    Grid,
    Icon,
} from "components-react-julseb"

// Styles
const Container = styled.div`
    display: flex;
    ${"" /* align-items: flex-; */}
    padding: ${Variables.Margins.M};
    border-radius: ${Variables.Radiuses.M};
    border: 1px solid ${Variables.Colors.Gray100};

    & > span {
        margin-right: ${Variables.Margins.S};
    }
`

const Location = styled(Font.Em)`
    display: flex;
    align-items: center;
    color: ${Variables.Colors.Gray500};

    & > span {
        margin-right: ${Variables.Margins.XXS};
    }
`

function UserCard({ user, ...props }) {
    return (
        <Container>
            <Avatar src={user.imageUrl} alt={user.fullName} size={64} />

            <Grid gap={Variables.Margins.XS}>
                <Font.H1>
                    {props.welcome && "Welcome "}
                    {getFirstName(user.fullName)}
                </Font.H1>

                {user.bio && <Font.P>{user.bio}</Font.P>}

                <Location>
                    <Icon name="location" size={16} />
                    {user.city}
                </Location>
            </Grid>
        </Container>
    )
}

export default UserCard
