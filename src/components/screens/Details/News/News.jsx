import Content from "../Content/Content"
import Cover from "../Cover/Cover"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const News = () => {
    const { id } = useParams()

    const news = useSelector(state => state.news)

    const newsPaper = news.find(elem => elem.newsId === id)
    
    return (
        <>
        <Cover newsPaper={newsPaper} />
        <Content newsPaper={newsPaper} />
        </>
    )
}

export default News