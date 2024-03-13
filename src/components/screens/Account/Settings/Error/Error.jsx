import styles from "./Error.module.scss"

const Error = ({ children, active }) => {
    return (
        <div className={[styles.error, active && styles.active].join(" ")}>
            <img className={styles.image} src="/images/svg/errorValid.svg" alt="error" />
            <p className={styles.message}>{ children }</p>
        </div>
    )
}

export default Error