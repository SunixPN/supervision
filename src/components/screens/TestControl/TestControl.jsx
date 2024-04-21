import { useQuery } from "react-query"
import Footer from "../../../layouts/Footer/Footer"
import HeaderAdmin from "../Admin/HeaderAdmin/HeaderAdmin"
import { CategoryService } from "../../../services/CategoryService"
import { useActions } from "../../../hooks/useActions"
import Loader from "../../ui/Loader/Loader"
import { useEffect } from "react"
import { TestService } from "../../../services/TestSerice"
import ControllContent from "./ControllContent/ControllContent"
import styles from "./TestControl.module.scss"
import { AuthService } from "../../../services/AuthService"
import TestLink from "../../ui/TestLink/TestLink"

const TestControl = () => {
    const { data: category, isLoading: loadCategory } = useQuery({
        queryKey: ["category"],
        queryFn: CategoryService.getAllCategories
    })

    const { data: tests, isLoading: loadTests } = useQuery({
        queryKey: ["tests"],
        queryFn: TestService.getTest
    })

    const { data: acc, isLoading: loadAcc } = useQuery({
        queryKey: ["account"],
        queryFn: AuthService.getAccount
    })

    const { initialCategory, setAccountData } = useActions()

    useEffect(() => {
        if (category) {
            initialCategory(category.categories[0].categories)
        }

        if (acc) {
            setAccountData(acc.accInfo[0])
        }

        window.scrollTo(0, 0)
    }, [category, acc])
    return (
        <>
        {
            (loadCategory || loadTests || loadAcc) ? <Loader pageLoading={true} text={"Загрузка данных"} />
            :
            <div className={styles.wrapper}>
            <HeaderAdmin />
            <ControllContent tests={tests.categories} />
            <Footer />
            <TestLink isAdmin={true} />
            </div>
        }
        </>
    )
}

export default TestControl