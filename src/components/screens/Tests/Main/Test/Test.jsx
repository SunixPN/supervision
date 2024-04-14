import { useNavigate } from "react-router-dom"
import styles from "./Test.module.scss"

const Test = ({ test }) => {
    const navigate = useNavigate()
    return (
        <article className={styles.test}>
            <div className={styles.testBox}>
                <img className={styles.image} src="/images/svg/test.svg" alt="testImage" />
                <div className={styles.content}>
                    <div className={styles.labelBox}>
                        <div className={styles.box}>
                            <p className={styles.label}>Количество вопросов:</p>
                            <span className={styles.value}>{test.testContent.length}</span>
                        </div>
                        <div className={styles.box}>
                            <p className={styles.label}>Название:</p>
                            <span className={styles.value}>{test.title}</span>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => navigate(`/tests/${test.testId}`)} className={styles.button}>Начать прохождение!</button>
        </article>
    )
}

export default Test