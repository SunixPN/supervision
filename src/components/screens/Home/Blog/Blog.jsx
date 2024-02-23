import Block from "./Block/Block"
import styles from "./Blog.module.scss"
import { useSelector } from "react-redux"
import Pagination from "./Pagination/Pagination"
import { useRef } from "react"

const Blog = () => {
    const news = useSelector(state => state.news)
    const ref = useRef(null)

    return (
        <section ref={ref} className={styles.blog}>
            <div className="wrapper">
                <h2 className={styles.title}>Все новости портала</h2>
                <div className={styles.content}>
                    {
                        news.map(elem => <Block key={elem.newsId} news={elem} />)
                    }
                </div>
                <Pagination ref={ref} />
            </div>
        </section>
    )
}

export default Blog