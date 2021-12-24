const randomAvatar = gender => {
    const randomNumber = Math.floor(Math.random() * 114)

    const randomMf = Math.floor(Math.random() + 0.5)
    const mf = ["male", "female"]

    if (gender === "man") {
        return `https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/${randomNumber}.png`
    } else if (gender === "woman") {
        return `https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/${randomNumber}.png`
    } else {
        return `https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/${mf[randomMf]}/${randomNumber}.png`
    }
}

export default randomAvatar
