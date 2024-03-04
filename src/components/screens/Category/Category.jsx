import { useQuery } from "react-query"
import Footer from "../../../layouts/Footer/Footer"
import Header from "../../../layouts/Header/Header"
import { useParams } from "react-router-dom"
import { NewsService } from "../../../services/NewsService"
import Loader from "../../ui/Loader/Loader"
import { CategoryService } from "../../../services/CategoryService"
import { useActions } from "../../../hooks/useActions"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import NewsByCategory from "./NewsByCategory/NewsByCategory"
import styles from "./Category.module.scss"

const Category = () => {
    const { category } = useParams()

    const { initialCategory } = useActions()
    const categories = useSelector(state => state.category)

    const { data: news, isLoading: loadingNews } = useQuery({
        queryFn: () => NewsService.getNewsByCategory(category),
        queryKey: ["newsByCategory", category],
    })

    const { data: dataCategory, isLoading: loadingCategory } = useQuery({
        queryFn: CategoryService.getAllCategories,
        queryKey: ["category"]
    })

    useEffect(() => {
        if (dataCategory) {
            initialCategory(dataCategory.categories[0].categories)
        }
        window.scrollTo(0, 0)
    }, [dataCategory])

    return (
        <>
        {
            (loadingNews || loadingCategory) || (categories.length === 0 || !news)
            ? <Loader pageLoading={true} text={"Загрузка новостей"} />
            :
            <div className={styles.container}>
            <Header />
            <NewsByCategory news={news.news} />
            <Footer />
            </div>
        }

        </>
    )
}

export default Category