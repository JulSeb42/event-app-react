// Packages
import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

// Components
import { AuthContext } from "../../context/auth"
import service from "../../api/service"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import ProfilePicture from "../../components/user/ProfilePicture"

function EditProfilePicture({ edited, setEdited }) {
    const { user, updateUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [imageUrl, setImageUrl] = useState("")
    const [picture, setPicture] = useState(user.imageUrl)
    const [isLoading, setIsLoading] = useState(false)

    const handleFileUpload = e => {
        e.preventDefault()
        const uploadData = new FormData()
        setIsLoading(true)

        uploadData.append("imageUrl", e.target.files[0])

        service
            .uploadImage(uploadData)
            .then(res => {
                setImageUrl(res.secure_url)
                setIsLoading(false)
            })
            .catch(err => console.log(err))

        if (e.target.files[0]) {
            setPicture(e.target.files[0])
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                setPicture(reader.result)
            })
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (imageUrl === "") {
            return
        }

        service
            .createImage({ imageUrl, id: user._id })
            .then(res => {
                setEdited(!edited)
                updateUser(res)

                navigate("/my-account")
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>Edit your profile picture</h1>

            <ProfilePicture src={picture} alt={user.fullName} size={200} />

            <Form
                btnPrimary="Save"
                btnCancel="/my-account"
                isLoading={isLoading}
                onSubmit={handleSubmit}
            >
                <Input
                    label="Upload your picture"
                    type="file"
                    onChange={e => handleFileUpload(e)}
                />
            </Form>
        </div>
    )
}

export default EditProfilePicture
