import Block from "./Block/Block"
import styles from "./Blog.module.scss"
import { news } from "../../../../data/news"

const Blog = () => {
    return (
        <section className={styles.blog}>
            <div className="wrapper">
                <h2 className={styles.title}>Все новости портала</h2>
                <div className={styles.content}>
                    {
                        news.map(elem => <Block key={elem.id} news={elem} />)
                    }
                </div>
            </div>
        </section>
    )
}

export default Blog