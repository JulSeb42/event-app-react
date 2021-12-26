// Packages
import React from "react"
import Link from "../utils/LinkScroll"

function CardPicture(props) {
    return (
        <Link to={`/user/${props.user._id}`}>
            <img src={props.user.imageUrl} alt={props.user.fullName} />

            <p>{props.user.fullName}</p>
        </Link>
    )
}

export default CardPicture
