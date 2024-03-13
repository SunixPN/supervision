import { useQuery } from "react-query"
import CreateNews from "./CreateNews/CreateNews"
import { CategoryService } from "../../../services/CategoryService"
import { useActions } from "../../../hooks/useActions"
import Loader from "../../ui/Loader/Loader"
import Footer from "../../../layouts/Footer/Footer"
import { useEffect } from "react"
import HeaderAdmin from "./HeaderAdmin/HeaderAdmin"
import { useSelector } from "react-redux"
import { AuthService } from "../../../services/AuthService"

const Admin = () => {
    const { data: category, isLoading } = useQuery({
        queryKey: ["category"],
        queryFn: CategoryService.getAllCategories,
    })

    const { data: acc, isLoading: loadAcc } = useQuery({
        queryKey: ["account"],
        queryFn: AuthService.getAccount
    })

    const categories = useSelector(state => state.category)
    const auth = useSelector(state => state.auth)
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
                (isLoading || categories.length === 0 || Object.keys(auth.accountData).length === 0 || loadAcc) 
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