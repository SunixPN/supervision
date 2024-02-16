import Card from "./Card/Card"
import styles from "./Popular.module.scss"
import { useSelector } from 'react-redux';

const Popular = () => {
    const news = useSelector(state => state.news)
    return (
        <section className={styles.popular}>
            <div className="wrapper">
                <div className={styles.content}>
                    <Card newspaper={news[news.length - 1]} news={news} />
                </div>
            </div>
            <div className={styles.container}></div>
        </section>
    )
}

export default Popular