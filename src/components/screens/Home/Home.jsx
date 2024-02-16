import Footer from "../../../layouts/Footer/Footer"
import Header from "../../../layouts/Header/Header"
import Blog from "./Blog/Blog"
import News from "./News/News"
import Popular from "./Popular/Popular"

const Home = () => {
    return (
        <>
            <Header />
            <Popular />
            <News />
            <Blog />
            <Footer />
        </>
    )
}

export default Home