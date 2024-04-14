import Editor from "./Editor/Editor"
import Footer from "../../../layouts/Footer/Footer"
import HeaderAdmin from "../Admin/HeaderAdmin/HeaderAdmin"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { NewsService } from "../../../services/NewsService"
import { useEffect } from "react"
import Loader from "../../ui/Loader/Loader"
import { CategoryService } from "../../../services/CategoryService"
import { useActions } from "../../../hooks/useActions"
import { AuthService } from "../../../services/AuthService"
import { useSelector } from "react-redux"
import TestLink from "../../ui/TestLink/TestLink"

const EditNews = () => {
    const { category } = useParams()
    const { initialCategory, setAccountData } = useActions()

    const auth = useSelector(state => state.auth)

    const { data: news, isLoading: loadNews } = useQuery({
        queryKey: ["newsByCategory", category],
        queryFn: () => NewsService.getNewsByCategory(category)  
    })

    const { data: dataCategories, isLoading: loadCategories } = useQuery({
        queryKey: ["category"],
        queryFn: CategoryService.getAllCategories
    })

    const { data: acc, isLoading: loadAcc } = useQuery({
        queryKey: ["account"],
        queryFn: AuthService.getAccount
    })

    useEffect(() => {
        if (dataCategories) {
            initialCategory(dataCategories.categories[0].categories)
        }

        if (acc) {
            setAccountData(acc.accInfo[0])
        }
        
        window.scrollTo(0, 0)
    }, [dataCategories, acc])
    return (
        <>
        {
            (loadNews || !news || loadCategories || !dataCategories || loadAcc || Object.keys(auth.accountData).length === 0) 
            ? 
            <Loader pageLoading={true} text={"Загрузка данных"} />
            :
            <>
            <HeaderAdmin />
            <Editor news={news.news} />
            <Footer />
            <TestLink isAdmin={true} />
            </>

        }

        </>
    )
}

export default EditNews