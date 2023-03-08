export const dateConverter = (date) => {
    const newDate = new Date(date).toString().split(" ").splice(0, 5).join(" ") + " IST"
    return newDate
}