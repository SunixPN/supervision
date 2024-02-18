import { useData } from "../../../hooks/useData"
import Footer from "../../../layouts/Footer/Footer"
import Header from "../../../layouts/Header/Header"
import Blog from "./Blog/Blog"
import News from "./News/News"
import Popular from "./Popular/Popular"
import Loader from "../../ui/Loader/Loader"
import { useEffect } from "react"

const Home = () => {
    const { loadNews, loadCategory, initial } = useData()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            {
                (loadNews || loadCategory) ? <Loader pageLoading={true} text={"Загрузка данных"} />
                :
                <>
                    {
                        initial()
                    }
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