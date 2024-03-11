import { useEffect } from "react"
import Footer from "../../../layouts/Footer/Footer"
import HeaderAdmin from "../Admin/HeaderAdmin/HeaderAdmin"
import styles from "./CategoryControl.module.scss"
import CategoryController from "./CategoryController/CategoryController"
import { useQuery } from "react-query"
import { useActions } from "../../../hooks/useActions"
import { useSelector } from "react-redux"
import Loader from "../../ui/Loader/Loader"
import { CategoryService } from "../../../services/CategoryService"

const CategoryControl = () => {
    const { data: category, isLoading: loadCategory } = useQuery({
        queryKey: ["category"],
        queryFn: CategoryService.getAllCategories,
        retry: 2
    })

    const { initialCategory } = useActions()
    const categories = useSelector(state => state.category)

    useEffect(() => {
        if (category) {
            initialCategory(category.categories[0].categories)
        }
    }, [category])

    return (
        <>
        {
            (loadCategory || categories.length === 0) ? <Loader pageLoading={true} text={"Загрузка данных"} />
            :
            <div className={styles.control}>
                <HeaderAdmin />
                <CategoryController />
                <Footer />
            </div>
        }
        </>
    )
}

export default CategoryControl