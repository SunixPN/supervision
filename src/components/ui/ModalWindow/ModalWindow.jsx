import { useEffect, useState } from "react"
import styles from "./ModalWindow.module.scss"

const ModalWindow = ({ children, active, setActive }) => {
    const [classesModal, setClassesModal] = useState([styles.modal, styles.hidden])
    const [classesContent, setClassesContent] = useState([styles.content, styles.contentHidden])
    const [firstMount, setFirstMount] = useState(true)

    useEffect(() => {
        if (firstMount) {
            setFirstMount(false)
        }

        if (!firstMount) {
            setClassesContent([styles.content, active ? "" : styles.contentOut])
            setClassesModal([styles.modal, active ? "" : styles.modalOut])
    
            if (!active) {
                setTimeout(() => {
                    setClassesContent([styles.content, styles.contentHidden])
                    setClassesModal([styles.modal, styles.hidden])
                }, 300)
            }
        }
    }, [active])
    
    return (
        <article onClick={() => setActive(false)} className={classesModal.join(" ")}>
            <div onClick={event => event.stopPropagation()} className={styles.wrapper}>
                <div className={classesContent.join(" ")}>
                    <button onClick={() => setActive(false)} className={styles.button}></button>
                    { children }
                </div>
            </div>
        </article>
    )
}

export default ModalWindow