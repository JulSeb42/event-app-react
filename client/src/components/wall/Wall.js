// Packages
import React, { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"

// Components
import Form from "./Form"
import * as Font from "../styles/Font"
import * as Variables from "../styles/Variables"
import List from "../events/List"
import Card from "./Card"

// Styles
const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.S};
`

const API_URL = "http://localhost:5005"

function Wall(props) {
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        axios
            .get(`${API_URL}/posts/post`)
            .then(res => setAllPosts(res.data))
            .catch(err => console.log(err))
    }, [])

    const filteredPosts = allPosts.filter(
        post => post.event._id === props.eventId
    )

    return (
        <Container>
            <Font.H2>Wall</Font.H2>

            <Form eventId={props.eventId} />

            <List>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                        <Card post={post} key={post._id} />
                    ))
                ) : (
                    <Font.P>Nothing here yet!</Font.P>
                )}
            </List>
        </Container>
    )
}

export default Wall
