import styles from "./News.module.scss"
import Button from './../../../ui/Button/Button';
import { news } from "../../../../data/news"

const News = () => {
    const newsPaper = news[news.length - 2]

    return (
        <section className={styles.section}>
            <img className={styles.image} src="/images/other/temp/card1.jpg" alt="card" />
            <h2 className={styles.title}>{newsPaper.title}</h2>
            <Button link={"#!"}>Читать</Button>
        </section>
    )
}

export default News