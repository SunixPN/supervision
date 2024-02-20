import styles from "./Cover.module.scss"

const Cover = ({ newsPaper }) => {
    return (
        <section className={styles.cover}>
            <img className={styles.image} src={newsPaper.titleImageUrl} alt="image" />
            <div className="wrapper">
                <div className={styles.content}>
                    <p className={styles.type}>{ newsPaper.categoryName }</p>
                    <h1 className={styles.title}>{ newsPaper.title }</h1>
                    <p className={styles.paragraph}>{ newsPaper.subTitle }</p>
                </div>
            </div>
        </section>
    )
}

export default Cover