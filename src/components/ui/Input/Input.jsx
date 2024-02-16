import styles from "./Input.module.scss"

const Input = ({...params}) => {
    return (
        <input className={styles.input} { ...params } type="text" />
    )
}

export default Input