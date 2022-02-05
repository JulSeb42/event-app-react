// Packages
import React, { useState, useContext, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Linkify from "react-linkify"
import {
    Avatar,
    Font,
    Variables,
    convertDateShort,
    Grid,
    Icon,
    Form,
    Input,
    Modal,
    Alert,
    Button,
    ButtonsContainer,
} from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"

// Styles
const Container = styled(Grid)`
    width: 100%;
    border: 1px solid ${Variables.Colors.Gray200};
    border-radius: ${Variables.Radiuses.M};
    padding: ${Variables.Margins.M};
`

const TitleContainer = styled.div`
    display: flex;

    & > span {
        margin-right: ${Variables.Margins.XS};
    }
`

const Title = styled(Grid)`
    flex-grow: 1;
`

const Date = styled(Font.Small)`
    color: ${Variables.Colors.Gray500};
    font-style: italic;
`

const ButtonsIconContainer = styled(Grid)`
    align-content: start;
    margin-left: ${Variables.Margins.XS};
`

const ButtonIcon = styled.button`
    --size: 32px;
    width: var(--size);
    height: var(--size);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: none;
    background: none;
    transition: ${Variables.Transitions.Short};
    color: ${Variables.Colors.Primary500};

    &.delete {
        color: ${Variables.Colors.Danger500};
    }

    &:hover {
        background-color: ${Variables.Colors.Gray50};
    }
`

const EditForm = styled(Form)`
    max-width: inherit;
`

function CardPost({ post }) {
    const { user } = useContext(AuthContext)

    // Edit message
    const [editMode, setEditMode] = useState(false)
    const [message, setMessage] = useState(post.message)

    const handleReset = () => {
        setEditMode(false)
        setMessage(post.message)
    }

    const handleMessage = e => setMessage(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { message }

        axios
            .put(`/posts/edit-post/${post._id}`, requestBody)
            .then(() => window.location.reload(false))
            .catch(err => console.log(err))
    }

    // Delete message
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        isModalOpen
            ? document.body.classList.add("stop-scrolling")
            : document.body.classList.remove("stop-scrolling")
    }, [isModalOpen])

    const handleDelete = e => {
        e.preventDefault()

        axios
            .delete(`/posts/delete-post/${post._id}`)
            .then(() => window.location.reload(false))
            .catch(err => console.log(err))
    }

    return (
        <>
            <Container gap={Variables.Margins.XS}>
                <TitleContainer>
                    <Avatar
                        src={post.poster.imageUrl}
                        alt={post.poster.fullName}
                    />

                    <Title gap={Variables.Margins.XXS}>
                        <Font.H4>
                            <Link to={`/users/${post.poster._id}`}>
                                {post.poster.fullName}
                            </Link>
                        </Font.H4>

                        <Date>
                            Posted on {convertDateShort(post.datePost)} at{" "}
                            {post.timePost}
                        </Date>

                        {post.edited && <Date>Edited</Date>}
                    </Title>

                    {user._id === post.poster._id && (
                        <ButtonsIconContainer
                            gap={Variables.Margins.XS}
                            col={2}
                        >
                            <ButtonIcon
                                className="edit"
                                onClick={() => setEditMode(true)}
                            >
                                <Icon name="edit" size={16} />
                            </ButtonIcon>

                            <ButtonIcon
                                className="delete"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <Icon name="trash" size={16} />
                            </ButtonIcon>
                        </ButtonsIconContainer>
                    )}
                </TitleContainer>

                {editMode ? (
                    <EditForm
                        btnprimary="Save changes"
                        textbtnreset="Cancel"
                        onClickReset={handleReset}
                        onSubmit={handleSubmit}
                    >
                        <Input
                            type="textarea"
                            onChange={handleMessage}
                            value={message}
                        />
                    </EditForm>
                ) : (
                    <Font.P pre>{post.message}</Font.P>
                )}
            </Container>

            <Modal className={isModalOpen ? "open" : ""}>
                <Alert color="danger">
                    <Font.P>
                        <Linkify>
                            Are you sure you want to delete your post?
                        </Linkify>
                    </Font.P>

                    <ButtonsContainer>
                        <Button color="danger" onClick={handleDelete}>
                            Yes, delete this post.
                        </Button>

                        <Button
                            btnstyle="text"
                            onClick={() => setIsModalOpen(false)}
                        >
                            No, cancel
                        </Button>
                    </ButtonsContainer>
                </Alert>
            </Modal>
        </>
    )
}

export default CardPost
