import { useQuery } from "react-query"
import Footer from "../../../layouts/Footer/Footer"
import Header from "../../../layouts/Header/Header"
import { CategoryService } from "../../../services/CategoryService"
import { useEffect } from "react"
import { useActions } from "../../../hooks/useActions"
import { useSelector } from "react-redux"
import Loader from "../../ui/Loader/Loader"
import Main from "./Main/Main"
import styles from "./Tests.module.scss"
import { TestService } from "../../../services/TestSerice"

const Tests = () => {
    const { data: categories, isLoading: loadCategories } = useQuery({
        queryKey: ["category"],
        queryFn: CategoryService.getAllCategories
    })

    const { data: tests, isLoading: loadTests } = useQuery({
        queryKey: ["tests"],
        queryFn: TestService.getTest
    })

    const { initialCategory } = useActions()
    const category = useSelector(state => state.category)

    useEffect(() => {
        if (categories) {
            initialCategory(categories.categories[0].categories)
        }
        window.scrollTo(0, 0)
    }, [categories])

    return (
        <>
        {
            (category.length === 0 || loadCategories || !tests || loadTests) 
            ?
            <Loader pageLoading={true} text={"Загрузка данных"} />
            :
            <div className={styles.wrapper}>
                <Header />
                <Main tests={tests.categories} />
                <Footer />
            </div>
        }
        </>
    )
}

export default Tests