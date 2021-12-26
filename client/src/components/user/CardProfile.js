// Packages
import React, { useContext } from "react"
import Link from "../utils/LinkScroll"

// Components
import { AuthContext } from "../../context/auth"
import * as Font from "../styles/Font"
import ProfilePicture from "./ProfilePicture"

// Utils
import convertDate from "../utils/convertDate"
import getFirstName from "../utils/getFirstName"

function CardProfile(props) {
    const { user } = useContext(AuthContext)
    return (
        <>
            <div>
                <ProfilePicture
                    src={props.user.imageUrl}
                    alt={props.user.fullName}
                    size={200}
                />

                <Font.H1>
                    {props.welcome && "Welcome "}
                    {props.user.fullName}
                </Font.H1>

                <Font.P>Born on {convertDate(props.user.dateBirth)}</Font.P>

                {!props.user.bio || props.user.bio === "" ? (
                    <Font.P>
                        {!props.welcome
                            ? `${getFirstName(
                                  props.user.fullName
                              )} did not write a bio yet!`
                            : "You did not write a bio yet!"}
                    </Font.P>
                ) : (
                    <Font.P>{props.user.bio}</Font.P>
                )}
            </div>

            {!props.welcome && props.user._id === user._id && (
                <Font.P>
                    <Link to="/my-account">Back to your account</Link>
                </Font.P>
            )}
        </>
    )
}

export default CardProfile