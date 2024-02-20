import { useQuery } from "react-query"
import CreateNews from "./CreateNews/CreateNews"
import { CategoryService } from "../../../services/CategoryService"
import { useActions } from "../../../hooks/useActions"
import Loader from "../../ui/Loader/Loader"
import Header from "../../../layouts/Header/Header"
import Footer from "../../../layouts/Footer/Footer"
import { useEffect } from "react"
import HeaderAdmin from "./HeaderAdmin/HeaderAdmin"

const Admin = () => {
    const { data: category, isLoading } = useQuery({
        queryKey: ["category"],
        queryFn: CategoryService.getAllCategories,
    })

    const { initialCategory } = useActions()

    const initial = () => {
        if (category) {
            initialCategory(category.categories)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <>
            {
                isLoading ? <Loader text={"Загрузка данных"} pageLoading={true} />
                :
                <>
                    {
                        initial()
                    }
                    <>
                    <HeaderAdmin />
                    <CreateNews />
                    <Footer />
                    </>

                </>  
            }
        </>
    )
}

export default Admin