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

const EditNews = () => {
    const { category } = useParams()
    const { initialCategory } = useActions()

    const { data: news, isLoading: loadNews } = useQuery({
        queryKey: ["newsByCategory", category],
        queryFn: () => NewsService.getNewsByCategory(category)  
    })

    const { data: dataCategories, isLoading: loadCategories } = useQuery({
        queryKey: ["category"],
        queryFn: CategoryService.getAllCategories
    })

    useEffect(() => {
        if (dataCategories) {
            initialCategory(dataCategories.categories[0].categories)
        }
        
        window.scrollTo(0, 0)
    }, [dataCategories])
    return (
        <>
        {
            (loadNews || !news || loadCategories || !dataCategories) ? <Loader pageLoading={true} text={"Загрузка данных"} />
            :
            <>
            <HeaderAdmin />
            <Editor news={news.news} />
            <Footer />
            </>

        }

        </>
    )
}

export default EditNews