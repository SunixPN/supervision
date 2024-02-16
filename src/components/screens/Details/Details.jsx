import { useData } from "../../../hooks/useData"
import Footer from "../../../layouts/Footer/Footer"
import Header from "../../../layouts/Header/Header"
import Content from "./Content/Content"
import styles from "./Details.module.scss"
import Loader from "../../ui/Loader/Loader"


const Details = () => {
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