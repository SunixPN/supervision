import styles from "./News.module.scss"
import Button from './../../../ui/Button/Button';
import { useSelector } from 'react-redux';
import { memo } from "react";

const News = memo(() => {
    const popular = useSelector(state => state.popular)
    const popularPaper = popular[1]

    return (
        <section className={styles.section}>
            <img className={styles.image} src={popularPaper.titleImageUrl} alt="card" />
            <h2 className={styles.title}>{popularPaper.title}</h2>
            <Button link={popularPaper.newsUrl}>Читать</Button>
        </section>
    )
})

export default News