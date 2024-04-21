import { useQuery } from "react-query"
import { CategoryService } from "../../../services/CategoryService"
import { useActions } from "../../../hooks/useActions"
import Loader from "../../ui/Loader/Loader"
import { useEffect } from "react"
import styles from "./TestResultDetail.module.scss"
import Footer from './../../../layouts/Footer/Footer';
import HeaderAdmin from './../Admin/HeaderAdmin/HeaderAdmin';
import { useParams } from "react-router-dom"
import { TestService } from "../../../services/TestSerice"
import Main from "./Main/Main"
import { AuthService } from "../../../services/AuthService"
import TestLink from "../../ui/TestLink/TestLink"

const TestResultDetail = () => {
    const { id } = useParams()

    const { data: category, isLoading: loadCategory } = useQuery({
        queryKey: ["category"],
        queryFn: CategoryService.getAllCategories
    })

    const { data: testResult, isLoading: loadTestResult } = useQuery({
        queryKey: ["testResult", id],
        queryFn: () => TestService.getTestResultById(id)
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
            (loadCategory || loadTestResult || loadAcc) ? <Loader pageLoading={true} text={"Загрузка данных"} />
            :
            <div className={styles.wrapper}>
            <HeaderAdmin />
            <Main result={testResult.listOfResults[0].testResults} />
            <Footer />
            <TestLink isAdmin={true} />
            </div>
        }
        </>
    )
}

export default TestResultDetail