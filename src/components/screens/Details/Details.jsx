import Footer from "../../../layouts/Footer/Footer"
import Header from "../../../layouts/Header/Header"
import Content from "./Content/Content"
import styles from "./Details.module.scss"


const Details = () => {
    return (
        <div className={styles.box}>
        <Header />
        <Content />
        <Footer />
        </div>
    )
}

export default Details