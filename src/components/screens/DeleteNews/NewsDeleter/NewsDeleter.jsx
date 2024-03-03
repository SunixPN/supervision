import { useRef } from "react"
import Pagination from "../../Home/Blog/Pagination/Pagination"
import DeleteBlock from "./DeleteBlock/DeleteBlock"

import styles from "./NewsDeleter.module.scss"

const NewsDeleter = ({ news }) => {
    const ref = useRef(null)

    return (
        <section className={styles.deleter}>
            <div className="wrapper">
                <div className={styles.content}>
                    <h2 className={styles.title}>Выбрать новость для удаления</h2>
                    <div className={styles.box}>
                        {
                            news.map(newsPaper =>
                                <DeleteBlock key={newsPaper.newsId} newsPaper={newsPaper} />
                            )
                        }
                    </div>
                </div>
                <Pagination ref={ref} />
            </div>
        </section>
    )
}

export default NewsDeleter