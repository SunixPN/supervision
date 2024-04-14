import { useState } from "react"
import Input from "../../../../ui/Input/Input"
import styles from "./QuestionForm.module.scss"
import AnswersForm from "./AnswersForm/AnswersForm"

const QuestionForm = ({ question, handleChangeTestContent, handleDeleteQuestion }) => {
    const handleAddAnswer = (event) => {
        event.preventDefault()
        handleChangeTestContent({
            ...question, 
            answers: [...question.answers, {id: question.answers.length + 1, answerForQuest: "", isCorrect: false}] }
        )
    }

    return (
        <div className={styles.queston}>
            <div className={styles.titleBox}>
                <h3 className={styles.questionTitle}>Вопрос {question.id}</h3>
                <button onClick={handleDeleteQuestion(question.id)} className={styles.buttonDelete}>Удалить вопрос</button>
            </div>
            <div className={styles.questionWrapper}>
                <div className={styles.inputField}>
                    <label className={styles.label} htmlFor={`title${question.id}`}>Заголовок вопроса</label>
                    <Input value={question.title} onChange={(event) => handleChangeTestContent({ ...question, title: event.target.value })} id={`title${question.id}`} />
                </div>
                <div className={styles.inputField}>
                    <label className={styles.label} htmlFor={`question${question.id}`}>Вопрос</label>
                    <textarea value={question.question} onChange={(event) => handleChangeTestContent({ ...question, question: event.target.value })} className={styles.textArea} id={`question${question.id}`}></textarea>
                </div>
            </div>  
            <div className={styles.titleAnswersBox}>
                    <h3 className={styles.titleAnswers}>Ответы</h3>
                    <button onClick={handleAddAnswer} className={styles.answersButton}>Добавить ответ</button>
            </div>
            <div className={styles.answers}>
                {
                    question.answers.length === 0
                    ?
                    <p className={styles.empty}>Добавьте ответы на ваш вопрос!</p>
                    :
                    question.answers.map(answer => <AnswersForm key={answer.id} handleChangeTestContent={handleChangeTestContent} answer={answer} question={question} />)
                }
            </div>
        </div>
    )
}

export default QuestionForm