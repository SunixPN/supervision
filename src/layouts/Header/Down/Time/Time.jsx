import styles from "./Time.module.scss"

const getDayString = (day) => {
    switch (day) {
        case 0: return "Воскресенье"
        case 1: return "Понедельник"
        case 2: return "Вторник"
        case 3: return "Среда"
        case 4: return "Четверг"
        case 5: return "Пятница"
        case 6: return "Суббота"

    }
}

const getMonthString = (month) => {
    switch (month) {
        case 0: return "Январь"
        case 1: return "Февраль"
        case 2: return "Март"
        case 3: return "Апрель"
        case 4: return "Май"
        case 5: return "Июнь"
        case 6: return "Июль"
        case 7: return "Август"
        case 8: return "Сентябрь"
        case 9: return "Октябрь"
        case 10: return "Ноябрь"
        case 11: return "Декабрь"

    }
}

const Time = () => {
    const date = new Date()
    const week = getDayString(date.getDay())
    const month = getMonthString(date.getMonth())
    const day = date.getDate()
    const year = date.getFullYear()

    return (
        <time className={styles.date}>{`${week}, ${month} ${day}, ${year}`}</time>
    )
}

export default Time