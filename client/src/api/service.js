import axios from "axios"

// const API_URL = "http://localhost:5005"

const service = axios.create({
    // make sure you use PORT = 5005 (the port where our server is running)
    baseURL: "http://localhost:5005/users",
    withCredentials: true, // => you might need this option if using cookies and sessions
})

const errorHandler = err => {
    throw err
}

const uploadImage = file => {
    return service
        .put(`/user/upload-picture`, file)
        .then(res => res.data)
        .catch(errorHandler)
}

const createImage = newImage => {
    return service
        .post(`/user/edit-picture`, newImage)
        .then(res => res.data)
        .catch(errorHandler)
}

const cloudinaryService = {
    service,
    uploadImage,
    createImage,
}

export default cloudinaryService
