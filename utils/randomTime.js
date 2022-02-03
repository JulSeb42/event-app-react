const randomTime = () => {
    let hour = Math.floor(Math.random() * (19 - 8)) + 8
    let minutes = Math.floor(Math.random() * (59 - 0) + 0)

    if (hour < 10) {
        hour = `0${hour}`
    }

    if (minutes < 10) {
        minutes = `0${minutes}`
    }

    return `${hour}:${minutes}`
}

module.exports = randomTime
