import Button from "../../../../ui/Button/Button"
import Recomend from "../Recomend/Recomend";
import styles from "./Card.module.scss"
import { news } from "../../../../../data/news"


const Card = ({ newspaper }) => {
    const lastIndex = news.length - 1

    const startIndex = Math.max(lastIndex - 5, 0) 

    return (
        <article className={styles.card}>
            <div className={styles.block}>
                <img className={styles.image} src="/images/other/temp/card.jpg" alt="card" />
                <p className={styles.sub}>{newspaper.type}</p>
                <h2 className={styles.title}>{newspaper.title}</h2>
                <Button link={"#!"}>Read more</Button>
            </div>
            <div className={styles.recomended}>
                <p className={styles.paragraph}>Рекомендовано для вас</p>
                {
                    news.slice(startIndex, lastIndex).map(elem => <Recomend key={elem.id} news={elem} />)
                }
            </div>
        </article>
    )
}

export default Card