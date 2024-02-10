import Button from "../../../../ui/Button/Button"
import Recomend from "../Recomend/Recomend";
import styles from "./Card.module.scss"
import { news } from "../../../../../data/news"

const Card = () => {
    return (
        <article className={styles.card}>
            <div className={styles.block}>
                <img className={styles.image} src="/images/other/temp/card.jpg" alt="card" />
                <p className={styles.sub}>Destinations</p>
                <h2 className={styles.title}>In Southeast England, White Cliffs and Fish</h2>
                <Button>Read more</Button>
            </div>
            <div className={styles.recomended}>
                <p className={styles.paragraph}>Recommended for you</p>
                {
                    news.map(elem => <Recomend news={elem} />)
                }
            </div>
        </article>
    )
}

export default Card