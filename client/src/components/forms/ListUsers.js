// Packages
import React from "react"

// Components
import Input from "./Input"
import CardSmall from "../user/CardSmall"

function ListUsers(props) {
    return (
        <div>
            <Input
                label="Invite people"
                type="search"
                id="searchUsers"
                onChange={props.handleSearch}
                value={props.valueSearch}
            />

            <ul>
                {props.results.map(user => (
                    <li key={user._id}>
                        <CardSmall
                            user={user}
                            name="invitedPeople"
                            onChange={props.handleInvitedPeople}
                            defaultChecked={
                                props.edit &&
                                props.invitedPeople.some(
                                    e => e._id === user._id
                                ) &&
                                true
                            }
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListUsers
