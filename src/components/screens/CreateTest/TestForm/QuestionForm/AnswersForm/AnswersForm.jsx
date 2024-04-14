import Input from "../../../../../ui/Input/Input"
import styles from "./AnswersForm.module.scss"
import RadioAnswer from "./RadioAnswer/RadioAnswer"

const AnswersForm = ({ answer, question, handleChangeTestContent }) => {
    const handleDeleteAnswer = (event) => {
        event.preventDefault()

        handleChangeTestContent({
            ...question,
            answers: [...question.answers.filter(answ => answ.id !== answer.id).map((answ, index) => ({ ...answ, id: index + 1 }))]
        })
    }

    const handleChange = (event) => {
        handleChangeTestContent({
            ...question,
            answers: [...question.answers.map(answ => answ.id === answer.id ? {...answ, answerForQuest: event.target.value} : answ)]
        })
    }

    return (
        <article className={styles.answers}>
            <div className={styles.titleBox}>
                <h3 className={styles.title}>Ответ { answer.id }</h3>
                <button onClick={handleDeleteAnswer} className={styles.delete}>Удалить ответ</button>
            </div>
            <div className={styles.box}>
                <div className={styles.inputBox}>
                    <label className={styles.label} htmlFor="answer">Ответ</label>
                    <Input value={answer.answerForQuest} onChange={handleChange} id={"answer"} />
                </div>
                <RadioAnswer answer={answer} question={question} handleChangeTestContent={handleChangeTestContent} />
            </div>
        </article>
    )
}

export default AnswersForm