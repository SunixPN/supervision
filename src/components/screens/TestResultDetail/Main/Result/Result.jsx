import styles from "./Result.module.scss"

const Result = ({ result }) => {
    return (
        <article className={styles.result}>
            <p className={styles.text}>Имя: <span>{ result.user }</span></p>
            <p className={styles.text}>Процент верных ответов: <span>{ result.procentOfCorrectAnswers }</span></p>
        </article>
    )
}

export default Result