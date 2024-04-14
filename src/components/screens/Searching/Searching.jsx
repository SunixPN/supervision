import { useQuery } from "react-query"
import Footer from "../../../layouts/Footer/Footer"
import Header from "../../../layouts/Header/Header"
import { useSelector } from "react-redux"
import { NewsService } from "../../../services/NewsService"
import { useEffect } from "react"
import { useActions } from "../../../hooks/useActions"
import Loader from "../../ui/Loader/Loader"
import NewsSearch from "./NewsSearch/NewsSearch"
import { CategoryService } from "../../../services/CategoryService"
import { useParams } from "react-router-dom"
import styles from "./Searching.module.scss"
import TestLink from "../../ui/TestLink/TestLink"

const Searching = () => {
    const search = useSelector(state => state.search)
    const { query } = useParams()
    const { initialSearchNews, initialCategory } = useActions()

    const {data: newsSearch, isLoading} = useQuery({
        queryKey: ["search", query.toLowerCase()],
        queryFn: () => NewsService.searchNews(query.split(" ")[0].toLowerCase())
    })

    const { data: dataCategories, isLoading: loadCategories } = useQuery({
        queryKey: ["category"],
        queryFn: CategoryService.getAllCategories
    })

    useEffect(() => {
        if (newsSearch) {
            initialSearchNews(newsSearch.news)
        }

        if (dataCategories) {
            initialCategory(dataCategories.categories[0].categories)
        }

    }, [newsSearch, dataCategories])
    return (
        <>
        {
            isLoading || loadCategories ? <Loader pageLoading={true} text={"Поиск новостей"} />
            :
            <div className={styles.wrapper}>
            <Header />
            <NewsSearch query={query} news={search.news} />
            <Footer />
            <TestLink />  
            </div>
        }
        </>
    )
}

export default Searching