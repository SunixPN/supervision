import Button from "../../../../ui/Button/Button"
import Recomend from "../Recomend/Recomend";
import styles from "./Card.module.scss"
import { Link } from "react-router-dom" 


const Card = ({ newspaper, news }) => {
    const lastIndex = 5
    const startIndex = 0
    
    const categoryLinkArray = newspaper.newsUrl.split("/")
    const categoryLink = `/category/${categoryLinkArray[2]}`

    return (
        <article className={styles.card}>
            <div className={styles.block}>
                <img className={styles.image} src={newspaper.titleImageUrl} alt="card" />
                <Link to={categoryLink} className={styles.sub}>{newspaper.categoryName}</Link>
                <h2 className={styles.title}>{newspaper.title}</h2>
                <Button link={newspaper.newsUrl}>Читать</Button>
            </div>
            <div className={styles.recomended}>
                <p className={styles.paragraph}>Рекомендовано для вас</p>
                {
                    news.slice(startIndex, lastIndex).map(elem => <Recomend key={elem.newsId} news={elem} />)
                }
            </div>
        </article>
    )
}

export default Card