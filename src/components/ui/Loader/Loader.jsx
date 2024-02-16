import styles from "./Loader.module.scss"

const Loader = ({ text }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.box}>
                <div className={styles.loader}></div>
                <p className={styles.paragraph}>{ text }</p>
            </div>
        </div>
    )
}

export default Loader