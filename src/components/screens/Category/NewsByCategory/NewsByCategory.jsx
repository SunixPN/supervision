import styles from "./NewsByCategory.module.scss"
import Block from "../../Home/Blog/Block/Block"

const NewsByCategory = ({ news }) => {
    return (
        <section className={styles.news}>
            <div className="wrapper">
                <div className={styles.content}>
                    {
                        news.length === 0 ?
                        <div className={styles.container}>
                            <img className={styles.image} src="/images/svg/empty.svg" alt="empty" />
                            <h2 className={styles.title}>Еще нету новостей по данной категории</h2>
                            <p className={styles.paragrpah}>
                                В скором времени новости будут добавлены. 
                                Пока можете посмотреть новости по другим категориям
                            </p>
                        </div>
                        :
                        <>
                        <h2 className={styles.title}>Новости по категории {'"' + news[0].categoryName + '"'}</h2>
                        <div className={styles.box}>
                            {
                                news.map(newsPaper => <Block news={newsPaper} key={newsPaper.newsId} />)
                            }
                        </div>
                        </>
                    }
                </div>
            </div>
        </section>
    )
}

export default NewsByCategory