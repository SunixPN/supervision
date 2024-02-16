import { useQuery } from "react-query"
import Footer from "../../../layouts/Footer/Footer"
import Header from "../../../layouts/Header/Header"
import Blog from "./Blog/Blog"
import News from "./News/News"
import Popular from "./Popular/Popular"
import { CategoryService } from './../../../services/CategoryService';
import { useEffect } from "react"
import { useActions } from './../../../hooks/useActions';
import Loader from "../../ui/Loader/Loader"

const Home = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["category"],
        queryFn: CategoryService.getAllCategories,
        retry: 2
    })

    const { initialCategory } = useActions()

    useEffect(() => { data && initialCategory(data) }, [data])

    return (
        <>
        <Header />
        <Popular />
        <News />
        <Blog />
        <Footer />
        { isLoading && <Loader text={"Подгрузка данных"} /> }
        </>
    )
}

export default Home