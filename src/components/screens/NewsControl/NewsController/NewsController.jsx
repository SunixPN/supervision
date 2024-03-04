import { useRef } from "react"
import Pagination from "../../Home/Blog/Pagination/Pagination"
import ControlBlock from "./ControlBlock/ControlBlock"
import styles from "./NewsController.module.scss"

const NewsController = ({ news }) => {
    const ref = useRef(null)

    return (
        <section ref={ref} className={styles.deleter}>
            <div className="wrapper">
                <div className={styles.content}>
                    <h2 className={styles.title}>Выбрать новость для редактирования/удаления</h2>
                    <div className={styles.box}>
                        {
                            news.map(newsPaper =>
                                <ControlBlock key={newsPaper.newsId} newsPaper={newsPaper} />
                            )
                        }
                    </div>
                </div>
                <Pagination ref={ref} />
            </div>
        </section>
    )
}

export default NewsController