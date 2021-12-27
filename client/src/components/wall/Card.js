// Packages
import React, { useContext } from "react"
import styled from "styled-components"
import Link from "../utils/LinkScroll"
import axios from "axios"

// Components
import ProfilePicture from "../user/ProfilePicture"
import * as Font from "../styles/Font"
import * as Variables from "../styles/Variables"
import Button from "../ui/Button"
import { AuthContext } from "../../context/auth"

// Utils
import convertDate from "../utils/convertDate"

// Styles
const Container = styled.div`
    border: 1px solid ${Variables.Colors.LightGray};
    border-radius: ${Variables.Radiuses.M};
    padding: ${Variables.Margins.S};
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.XXS};
`

const Poster = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    img {
        margin-right: ${Variables.Margins.XS};
    }
`

const InfoContainer = styled.span`
    display: grid;
    grid-template-columns: 1fr;
    flex-grow: 1;

    em {
        color: ${Variables.Colors.Gray};
        font-size: ${Variables.FontSizes.Label};
    }
`

const Message = styled(Font.P)``

const API_URL = "http://localhost:5005"

function Card(props) {
    const { user } = useContext(AuthContext)

    const handleDelete = () => {
        axios
            .delete(`${API_URL}/posts/post/${props.post._id}/delete`)
            .then(() => {
                window.location.reload(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <Poster>
                <ProfilePicture
                    src={props.post.poster.imageUrl}
                    alt={props.post.poster.fullName}
                    size={32}
                />

                <InfoContainer>
                    <Font.P>
                        <Link to={`/user/${props.post.poster._id}`}>
                            {props.post.poster.fullName}
                        </Link>
                    </Font.P>

                    <Font.Em>
                        Posted on {convertDate(props.post.datePost)} at{" "}
                        {props.post.timePost}
                    </Font.Em>
                </InfoContainer>

                {user._id === props.post.poster._id && (
                    <Button btnstyle="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                )}
            </Poster>

            <Message>{props.post.message}</Message>
        </Container>
    )
}

export default Card
