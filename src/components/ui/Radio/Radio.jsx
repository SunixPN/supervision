import styles from "./Radio.module.scss"

const Radio = ({ id, answer, setCurrentAnswers, currentAnswers }) => {
    const handleChange = () => {
        if (!!currentAnswers.some(current => current.id === id)) {
            setCurrentAnswers([ ...currentAnswers.filter(current => current.id !== id), { id: id, answer: answer.id } ])
        }

        else {
            setCurrentAnswers([ ...currentAnswers, { id: id, answer: answer.id } ])
        }
    }

    const isChecked = currentAnswers.some(current => {
        return (current.id === id && current.answer === answer.id)
    })

    return (
        <div className={styles.radio}>
            <input
            checked={!!isChecked}
            onChange={handleChange}
            className={styles.input}
            id={`${id}radio${answer.id}`} 
            name={`${id}radio`} 
            type="radio" 
            />
            <label className={styles.label} htmlFor={`${id}radio${answer.id}`}></label>
            <label htmlFor={`${id}radio${answer.id}`} className={styles.text}>{ answer.answerForQuest }</label>
        </div>
    )
}

export default Radio