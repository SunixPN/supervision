import styles from "./RadioAnswer.module.scss"

const RadioAnswer = ({ answer, question, handleChangeTestContent }) => {
    const handleChange = () => {
        handleChangeTestContent({ 
            ...question, 
            answers: [...question.answers.map(answ => answ.id === answer.id ? {...answ, isCorrect: true} : {...answ, isCorrect: false})] })
    }
    return (
        <div className={styles.radio}>
            <p className={styles.text}>Верный ответ?</p>
            <input
            checked={answer.isCorrect}
            onChange={handleChange}
            className={styles.input}
            id={`${question.id}radioAnswer${answer.id}`} 
            name={`${question.id}radioAnswer`} 
            type="radio" 
            />
            <label className={styles.label} htmlFor={`${question.id}radioAnswer${answer.id}`}></label>
        </div>
    )
}

export default RadioAnswer