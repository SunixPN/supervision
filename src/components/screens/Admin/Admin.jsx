import { useQuery } from "react-query"
import CreateNews from "./CreateNews/CreateNews"
import { CategoryService } from "../../../services/CategoryService"
import { useActions } from "../../../hooks/useActions"
import Loader from "../../ui/Loader/Loader"
import Footer from "../../../layouts/Footer/Footer"
import { useEffect } from "react"
import HeaderAdmin from "./HeaderAdmin/HeaderAdmin"
import { useSelector } from "react-redux"

const Admin = () => {
    const { data: category, isLoading } = useQuery({
        queryKey: ["category"],
        queryFn: CategoryService.getAllCategories,
    })

    const categories = useSelector(state => state.category)
    const { initialCategory } = useActions()

    useEffect(() => {
        if (category) {
            initialCategory(category.categories[0].categories)
        }
        
        window.scrollTo(0, 0)
    }, [category])
    
    return (
        <>
            {
                isLoading || categories.length === 0 
                ? 
                <Loader text={"Загрузка данных"} pageLoading={true} />
                :    
                <>
                <HeaderAdmin />
                <CreateNews />
                <Footer />
                </> 
            }
        </>
    )
}

export default Admin