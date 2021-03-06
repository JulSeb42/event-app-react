// Packages
import React from "react"
import styled from "styled-components"
import { Variables, Input } from "components-react-julseb"

// Components
import CardSmall from "../user/CardSmall"

// Styles
const Container = styled.div`
    padding: ${Variables.Margins.S};
    border: 1px solid ${Variables.Colors.Gray200};
    border-radius: ${Variables.Radiuses.S};
`

const List = styled.ul`
    max-height: 300px;
    overflow-y: scroll;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
        padding: ${Variables.Margins.S} 0;

        &:not(:last-child) {
            border-bottom: 1px solid ${Variables.Colors.Gray200};
        }
    }
`

function InvitePeople(props) {
    return (
        <Container>
            <Input
                label="Invite people"
                type="search"
                id="searchUsers"
                onChange={props.handleSearch}
                value={props.valueSearch}
            />

            <List>
                {props.results
                    .sort((a, b) => {
                        return a.fullName > b.fullName ? 1 : -1
                    })
                    .map(user => (
                        <li key={user._id}>
                            <CardSmall
                                user={user}
                                name="invitedPeople"
                                onChange={props.handleInvitedPeople}
                                defaultChecked={
                                    props.edit &&
                                    props.invitedPeople
                                        .map(user => user._id)
                                        .includes(user._id) &&
                                    true
                                }
                                {...props}
                            />
                        </li>
                    ))}
            </List>
        </Container>
    )
}

export default InvitePeople
