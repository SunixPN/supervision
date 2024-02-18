import Block from "./Block/Block"
import styles from "./Blog.module.scss"
import { useSelector } from "react-redux"

const Blog = () => {
    const news = useSelector(state => state.news)

    const newsReverse = [...news].reverse()

    return (
        <section className={styles.blog}>
            <div className="wrapper">
                <h2 className={styles.title}>Все новости портала</h2>
                <div className={styles.content}>
                    {
                        newsReverse.map(elem => <Block key={elem.newsId} news={elem} />)
                    }
                </div>
            </div>
        </section>
    )
}

export default Blog