import styles from "./Loader.module.scss"

const Loader = ({ text, pageLoading }) => {
    const wrapperClasses = [styles.wrapper, pageLoading ? styles.white : ""]
    const pClasses = [styles.paragraph, pageLoading ? styles.p : ""]
    return (
        <div className={wrapperClasses.join(" ")}>
            <div className={styles.box}>
                <div className={styles.loader}></div>
                <p className={pClasses.join(" ")}>{ text }</p>
            </div>
        </div>
    )
}

export default Loader