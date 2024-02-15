import { useQuery } from "react-query"
import Footer from "../../../layouts/Footer/Footer"
import Header from "../../../layouts/Header/Header"
import Blog from "./Blog/Blog"
import News from "./News/News"
import Popular from "./Popular/Popular"
import { CategoryService } from './../../../services/CategoryService';
import { useEffect } from "react"
import { useActions } from './../../../hooks/useActions';
import { Link } from 'react-router-dom';

const Home = () => {
    const { data } = useQuery({
        queryKey: ["category"],
        queryFn: CategoryService.getAllCategories,
        retry: 2
    })

    const { initialCategory } = useActions()

    useEffect(() => { data && initialCategory(data) }, [data])

    return (
        <>
        <Link to={"/admin"}>ССЫЛКА</Link>
        <Header />
        <Popular />
        <News />
        <Blog />
        <Footer />
        </>
    )
}

export default Home