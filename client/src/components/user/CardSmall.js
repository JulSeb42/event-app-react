// Packages
import React from "react"

// Components
import ProfilePicture from "./ProfilePicture"

function CardSmall(props) {
    return (
        <div>
            <input
                type="checkbox"
                id={`user-${props.user._id}`}
                name={props.name}
                value={props.user._id}
                onClick={props.onChange}
                {...props}
            />

            <ProfilePicture
                src={props.user.imageUrl}
                alt={props.user.fullName}
            />

            <span>{props.user.fullName}</span>
        </div>
    )
}

export default CardSmall
