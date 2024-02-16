import { useData } from "../../../hooks/useData"
import Footer from "../../../layouts/Footer/Footer"
import Header from "../../../layouts/Header/Header"
import Blog from "./Blog/Blog"
import News from "./News/News"
import Popular from "./Popular/Popular"
import Loader from "../../ui/Loader/Loader"

const Home = () => {
    const { loadNews, loadCategory, initial } = useData()
    return (
        <>
            {
                (loadNews || loadCategory) ? <Loader text={"Подгрузка данных"} />
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