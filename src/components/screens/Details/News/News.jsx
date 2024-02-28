import Content from "../Content/Content"
import Cover from "../Cover/Cover"
import { useParams } from "react-router-dom"

const News = ({ news }) => {
    const { id } = useParams()

    const newsPaper = news.find(elem => elem.newsId === id)
    
    return (
        <>
        <Cover newsPaper={newsPaper} />
        <Content newsPaper={newsPaper} />
        </>
    )
}

export default News