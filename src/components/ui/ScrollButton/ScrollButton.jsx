import styles from "./ScrollButton.module.scss"

const ScrollButton = () => {
    const scrollSettings = {
        behavior: "smooth",
        left: 0,
        top: 0
    }

    return (
        <button onClick={() => window.scrollTo(scrollSettings)} className={styles.button} />
    )
}

export default ScrollButton