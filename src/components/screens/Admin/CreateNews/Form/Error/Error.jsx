import styles from "./Error.module.scss"

const Error = ({ message }) => {
    return (
        <div className={styles.error}>
            <img className={styles.image} src="/images/svg/error.svg" alt="error" />
            <p className={styles.text}>{ message }</p>
        </div>
    )
}

export default Error