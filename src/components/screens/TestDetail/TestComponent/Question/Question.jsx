import styles from "./Question.module.scss"

const Question = ({ question, active, setCurrentQuestion, status }) => {
    const color =
        status === "Ждёт решения" 
        ?
        "#4592FF"
        :
        status === "Выполнен"
        ?
        "#3DC47E"
        :
        "#FF4F52"

    return (
        <div 
        style={{ backgroundColor: status === "Ждёт решения" ? "" : color, cursor: status === "Ждёт решения" ? "pointer" : "auto" }} 
        onClick={status === "Ждёт решения" ? () => setCurrentQuestion({ ...question }) : null} 
        className={[styles.question, (active || status !== "Ждёт решения") && styles.active].join(" ")}
        >
            <div className={styles.status}>
                <div className={styles.circle} />
                <p className={styles.statusText}>{ status }</p>
            </div>
            <h4 className={styles.title}><span className={styles.number}>{ question.id } </span>{ question.title }</h4>
        </div>
    )
}

export default Question