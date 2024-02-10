import Card from "./Card/Card"
import styles from "./Popular.module.scss"
import { news } from "../../../../data/news"

const Popular = () => {
    return (
        <section className={styles.popular}>
            <div className="wrapper">
                <div className={styles.content}>
                    <Card newspaper={news[news.length - 1]} />
                </div>
            </div>
        </section>
    )
}

export default Popular