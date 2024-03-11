import Button from "../../../../ui/Button/Button"
import styles from "./Block.module.scss"
import { Link } from "react-router-dom"

const Block = ({ news, controllers = false, setActiveModal = null }) => {
    const categoryLinkArray = news.newsUrl.split("/")
    const categoryLink = `/category/${categoryLinkArray[2]}`

    return (
        <article className={controllers ? styles.articleEdit : styles.article}>
            <Link className={styles.linkImage} to={news.newsUrl}>
                <img className={styles.image} src={news.titleImageUrl} alt="news" />
            </Link>
            <div className={styles.content}>
                <Link to={categoryLink} className={styles.type}>{ news.categoryName }</Link>
                <h3 className={styles.title}>{ news.title }</h3>
                <p className={styles.sub}>{ news.subTitle }</p>
            </div>
            <div className={styles.button}>
                {
                    controllers && 
                    <div className={styles.controlBox}>
                        <Link to={`/newsEdit/${news.newsUrl.split("/")[2]}/${news.newsId}`} className={[styles.buttonControll, styles.edit].join(" ")} />
                        <button onClick={() => setActiveModal(true)} className={[styles.buttonControll, styles.delete].join(" ")} />
                    </div>
                }
                <Button link={news.newsUrl}>Перейти</Button>
            </div>
        </article>
    )
}

export default Block