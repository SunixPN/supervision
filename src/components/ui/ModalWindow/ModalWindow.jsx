import styles from "./ModalWindow.module.scss"

const ModalWindow = ({ children, active, setActive }) => {
    const classesModal = [styles.modal, active ? "" : styles.hidden ]
    const classesContent = [styles.content, active ? "" : styles.contentHidden]

    return (
        <article className={classesModal.join(" ")}>
            <div className={styles.wrapper}>
                <div className={classesContent.join(" ")}>
                    <button onClick={() => setActive(false)} className={styles.button}></button>
                    { children }
                </div>
            </div>
        </article>
    )
}

export default ModalWindow