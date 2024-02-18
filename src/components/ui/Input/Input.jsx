import { useState } from "react"
import styles from "./Input.module.scss"

const Input = ({type = "text", ...params}) => {
    const [hide, setHide] = useState(true)

    const classess = [styles.button, hide ? "" : styles.buttonSee]

    const handleClick = (event) => {
        event.preventDefault()
        setHide(prev => !prev)
    }

    return (
        <>
            {
                type === "text" 
                ?
                <input className={styles.input} { ...params } type="text" />
                :
                type === "password" 
                && 
                <div className={styles.box}>
                    <input className={styles.pass} { ...params } type={hide ? "password" : "text"} />
                    <button onClick={handleClick} className={classess.join(" ")}></button>
                </div>
            }
        </>

    )
}

export default Input