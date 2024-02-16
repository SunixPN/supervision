import styles from "./News.module.scss"
import Button from './../../../ui/Button/Button';
import { useSelector } from 'react-redux';

const News = () => {
    const news = useSelector(state => state.news)
    const newsPaper = news[news.length - 2]

    return (
        <section className={styles.section}>
            <img className={styles.image} src={newsPaper?.titleImageUrl} alt="card" />
            <h2 className={styles.title}>{newsPaper?.title}</h2>
            <Button link={newsPaper?.newsUrl}>Читать</Button>
        </section>
    )
}

export default News