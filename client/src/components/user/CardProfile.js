// Packages
import React, { useContext } from "react"
import Link from "../utils/LinkScroll"
import styled from "styled-components"

// Components
import { AuthContext } from "../../context/auth"
import * as Font from "../styles/Font"
import ProfilePicture from "./ProfilePicture"
import * as Variables from "../styles/Variables"

// Utils
import convertDate from "../utils/convertDate"
import getFirstName from "../utils/getFirstName"

// Styles
const Container = styled.div`
    border: 1px solid ${Variables.Colors.LightGray};
    border-radius: ${Variables.Radiuses.XL};
    padding: ${Variables.Margins.L};
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: ${Variables.Margins.L};
`

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.XXS};

    h1 {
        margin-bottom: ${Variables.Margins.XXS};
    }
`

const Info = styled(Font.P)`
    font-style: italic;
    color: ${Variables.Colors.Gray};
`

function CardProfile(props) {
    const { user } = useContext(AuthContext)
    return (
        <>
            <Container>
                <ProfilePicture
                    src={props.user.imageUrl}
                    alt={props.user.fullName}
                    size={100}
                />

                <Content>
                    <Font.H1>
                        {props.welcome && "Welcome "}
                        {props.user.fullName}
                    </Font.H1>

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

                    <Info>Born on {convertDate(props.user.dateBirth)}</Info>

                    <Info>Lives in {props.user.city}</Info>
                </Content>
            </Container>

            {!props.welcome && props.user._id === user._id && (
                <Font.P>
                    <Link to="/my-account">Back to your account</Link>
                </Font.P>
            )}
        </>
    )
}

export default CardProfile
