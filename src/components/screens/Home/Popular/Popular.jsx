import Card from "./Card/Card"
import styles from "./Popular.module.scss"

const Popular = () => {
    return (
        <section className={styles.popular}>
            <div className="wrapper">
                <div className={styles.content}>
                    <Card />
                </div>
            </div>
        </section>
    )
}

export default Popular