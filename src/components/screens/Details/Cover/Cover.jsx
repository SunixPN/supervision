import styles from "./Cover.module.scss"
import { Link } from "react-router-dom"

const Cover = ({ newsPaper }) => {
    const categoryLinkArray = newsPaper.newsUrl.split("/")
    const categoryLink = `/category/${categoryLinkArray[2]}`

    return (
        <section className={styles.cover}>
            <img className={styles.image} src={newsPaper.titleImageUrl} alt="image" />
            <div className="wrapper">
                <div className={styles.content}>
                    <Link to={categoryLink} className={styles.type}>{ newsPaper.categoryName }</Link>
                    <h1 className={styles.title}>{ newsPaper.title }</h1>
                    <p className={styles.paragraph}>{ newsPaper.subTitle }</p>
                </div>
            </div>
        </section>
    )
}

export default Cover