import Footer from "../../../layouts/Footer/Footer"
import Header from "../../../layouts/Header/Header"
import Blog from "./Blog/Blog"
import News from "./News/News"
import Popular from "./Popular/Popular"
import Loader from "../../ui/Loader/Loader"
import { useEffect } from "react"
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useActions } from './../../../hooks/useActions';
import { CategoryService } from './../../../services/CategoryService';
import { NewsService } from './../../../services/NewsService';

const Home = () => {
    const { data: category, isLoading: loadCategory } = useQuery({
        queryKey: ["category"],
        queryFn: CategoryService.getAllCategories,
        retry: 2
    })

    const { data: dataNews, isLoading: loadNews } = useQuery({
        queryKey: ["newsLimit", 1],
        queryFn: () => NewsService.getNewsWithLimit(10, 1),
        retry: 2
    })

    const queries = useSelector(state => state.queries)
    const news = useSelector(state => state.news)
    const categories = useSelector(state => state.category)

    const { initialCategory, initialNews, initialPopular, setNews, setCategory } = useActions()

    useEffect(() => {
        if (category && queries.category) {
            setCategory()
            initialCategory(category.categories[0].categories)
        }

        if (dataNews && queries.news) {
            setNews()
            initialPopular(dataNews.news)
            initialNews(dataNews.news)
        }

        window.scrollTo(0, 0)
    }, [category, dataNews])

    return (
        <>
            {
                ((loadNews || loadCategory) || ((news.length === 0) || (categories.length === 0))) 
                ? 
                <Loader pageLoading={true} text={"Загрузка данных"} />
                :
                <>
                    <Header />
                    <Popular />
                    <News />
                    <Blog />
                    <Footer />
                </>
            }
        </>

    )
}

export default Home