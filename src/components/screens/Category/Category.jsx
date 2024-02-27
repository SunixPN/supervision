import { useQuery } from "react-query"
import Footer from "../../../layouts/Footer/Footer"
import Header from "../../../layouts/Header/Header"
import { useParams } from "react-router-dom"
import { NewsService } from "../../../services/NewsService"
import Loader from "../../ui/Loader/Loader"
import { CategoryService } from "../../../services/CategoryService"
import { useActions } from "../../../hooks/useActions"

const Category = () => {
    const { category } = useParams()
    const { initialCategory } = useActions()


    const { data: news, isLoading: loadingNews } = useQuery({
        queryFn: () => NewsService.getNewsByCategory(category),
        queryKey: ["newsByCategory", category],
    })

    const { data: categories, isLoading: loadingCategory, isFetchedAfterMount: fetchCategory } = useQuery({
        queryFn: CategoryService.getAllCategories,
        queryKey: ["category"]
    })

    const initial = () => {
        if (categories && fetchCategory) {
            initialCategory(categories.categories[0].categories)
        }
    }

    return (
        <>
        {
            loadingNews || loadingCategory ? <Loader pageLoading={true} text={"Загрузка новостей"} />
            :
            <>
            {
                initial()
            }
            <Header />
            <Footer />
            </>
        }

        </>
    )
}

export default Category