import Footer from "../../../layouts/Footer/Footer"
import Header from "../../../layouts/Header/Header"
import styles from "./Details.module.scss"
import Loader from "../../ui/Loader/Loader"
import { useEffect } from "react"
import News from "./News/News"
import { useQuery } from "react-query"
import { CategoryService } from "../../../services/CategoryService"
import { useActions } from "../../../hooks/useActions"
import { useParams } from "react-router-dom"
import { NewsService } from "../../../services/NewsService"
import { useSelector } from "react-redux"
import ScrollButton from "../../ui/ScrollButton/ScrollButton"


const Details = () => {
    const { initialCategory, setCategory } = useActions()
    const queries = useSelector(state => state.queries)
    const categories = useSelector(state => state.category)

    const { category } = useParams()

    const { data: categoryData, isLoading: loadCategory } = useQuery({
        queryKey: ["category"],
        queryFn: CategoryService.getAllCategories
    })

    const { data: news, isLoading: loadNews } = useQuery({
        queryKey: ["newsByCategory", category],
        queryFn: () => NewsService.getNewsByCategory(category)
    })

    useEffect(() => {
        if (categoryData && queries.category) {
            setCategory()
            initialCategory(categoryData.categories[0].categories) 
        }
        window.scrollTo(0, 0)
    }, [categoryData])

    return (
        <>
            {
                (loadNews || loadCategory) || (categories.length === 0 || !news)
                ? 
                <Loader pageLoading={true} text={"Загрузка данных"} />
                :
                <>
                    <ScrollButton />
                    <div className={styles.box}>
                        <Header />
                        <News news={news.news} />
                        <Footer />
                    </div>
                </>
            }
        </>
    )
}

export default Details