import { useData } from "../../../hooks/useData"
import Footer from "../../../layouts/Footer/Footer"
import Header from "../../../layouts/Header/Header"
import Content from "./Content/Content"
import styles from "./Details.module.scss"
import Loader from "../../ui/Loader/Loader"
import { useEffect } from "react"


const Details = () => {
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
                    <div className={styles.box}>
                        <Header />
                        <Content />
                        <Footer />
                    </div>
                </>
            }
        </>
    )
}

export default Details