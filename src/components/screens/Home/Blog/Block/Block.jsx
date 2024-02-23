import Button from "../../../../ui/Button/Button"
import styles from "./Block.module.scss"

const Block = ({ news }) => {
    return (
        <article className={styles.article}>
            <img className={styles.image} src={news?.titleImageUrl} alt="news" />
            <div className={styles.content}>
                <p className={styles.type}>{ news?.categoryName }</p>
                <h3 className={styles.title}>{ news?.title }</h3>
                <p className={styles.sub}>{ news?.subTitle }</p>
            </div>
            <div className={styles.button}>
                <Button link={news?.newsUrl}>Перейти</Button>
            </div>
        </article>
    )
}

export default Block