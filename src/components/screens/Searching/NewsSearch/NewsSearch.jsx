import Block from "../../Home/Blog/Block/Block"
import styles from "./NewsSearch.module.scss"

const NewsSearch = ({ news, query }) => {

    return (
        <section className={styles.section}>
            <div className="wrapper">
                <div className={styles.content}>
                    {
                        news.length === 0
                        ?
                        <>
                            <img className={styles.image} src="/images/svg/empty.svg" alt="empty" />
                            <h2 className={styles.title}>Результаты поиска по запросу "{query}"</h2>
                            <p className={styles.paragraph}>Новостей по данному запросу не найдено...</p>
                        </>
                        :
                        <>
                            <h2 className={styles.title}>Результаты поиска по запросу "{query}"</h2>
                            <div className={styles.box}>
                                {
                                    news.map(newsPaper => <Block key={newsPaper.newsId} news={newsPaper} />)
                                }
                            </div>
                        </>

                    }
                </div>
            </div>

        </section>
    )
}

export default NewsSearch