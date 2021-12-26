// Get time
const getNow = n => {
    const today = new Date()

    if (today.getHours() < 10) {
        return `0${today.getHours() + n}:00`
    } else if (today.getHours() === 23 && n === 1) {
        return `00:00`
    } else {
        return `${today.getHours() + n}:00`
    }
}

export default getNow
