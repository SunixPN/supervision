import Button from "../../../../ui/Button/Button"
import styles from "./Block.module.scss"
import { Link } from "react-router-dom"

const Block = ({ news }) => {
    const categoryLinkArray = news.newsUrl.split("/")
    const categoryLink = `/category/${categoryLinkArray[2]}`

    return (
        <article className={styles.article}>
            <img className={styles.image} src={news.titleImageUrl} alt="news" />
            <div className={styles.content}>
                <Link to={categoryLink} className={styles.type}>{ news.categoryName }</Link>
                <h3 className={styles.title}>{ news.title }</h3>
                <p className={styles.sub}>{ news.subTitle }</p>
            </div>
            <div className={styles.button}>
                <Button link={news.newsUrl}>Перейти</Button>
            </div>
        </article>
    )
}

export default Block