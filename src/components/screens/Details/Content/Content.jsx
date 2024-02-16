import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux';
import styles from "./Content.module.scss"

const Content = () => {
    const { id } = useParams()

    console.log(id)

    const news = useSelector(state => state.news)

    const newsPaper = news.find(elem => elem.newsId === id)

    return (
        <div className={styles.box} dangerouslySetInnerHTML={{__html: newsPaper?.newsContent}}></div>
    )
}

export default Content