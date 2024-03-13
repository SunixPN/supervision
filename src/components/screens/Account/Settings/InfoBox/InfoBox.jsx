import { forwardRef } from "react"
import { useState } from "react"
import styles from "./InfoBox.module.scss"

const InfoBox = forwardRef(({ text, property, formState, setFormState }, ref) => {
    const [activeInputState, setActiveInputState] = useState(false)

    const handleChangeClick = () => {
        ref.current.disabled = false
        ref.current.focus()
        setActiveInputState(true)
    }

    const handleBlur = () => {
        ref.current.disabled = true
        setActiveInputState(false)
    }

    const handleChange = (event) => {
        setFormState({...formState, [property]: event.target.value})
    }

    return (
        <div className={styles.infoBox}>
            <p className={styles.paragraph}>{ text }</p>
            <div className={styles.edit}>
                <input
                value={formState[property]}
                onChange={handleChange}
                ref={ref}
                onBlur={handleBlur}
                placeholder={`${text} ...`} 
                disabled
                className={[styles.input, !activeInputState && styles.disable].join(" ")} 
                type="text" 
                />
                <button onClick={handleChangeClick} className={styles.buttonChange}>Изменить</button>
            </div>
        </div>
    )
})

export default InfoBox