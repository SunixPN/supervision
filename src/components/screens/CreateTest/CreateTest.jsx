import { useQuery } from "react-query";
import Footer from "../../../layouts/Footer/Footer"
import HeaderAdmin from './../Admin/HeaderAdmin/HeaderAdmin';
import TestForm from "./TestForm/TestForm";
import { useActions } from "../../../hooks/useActions";
import { useEffect } from "react";
import Loader from "../../ui/Loader/Loader";
import { CategoryService } from "../../../services/CategoryService";
import { AuthService } from "../../../services/AuthService";

const CreateTest = () => {
    const { data: categories, isLoading: loadCategories } = useQuery({
        queryKey: ["category"],
        queryFn: CategoryService.getAllCategories
    })

    const { data: acc, isLoading: loadAcc } = useQuery({
        queryKey: ["account"],
        queryFn: AuthService.getAccount
    })

    const { initialCategory, setAccountData } = useActions()

    useEffect(() => {
        if (categories) {
            initialCategory(categories.categories[0].categories)
        }

        if (acc) {
            setAccountData(acc.accInfo[0])
        }

    }, [categories, acc])

    return (
        <>
        {
            (loadCategories || loadAcc) ? <Loader pageLoading={true} text={"Загрузка данных"} />
            :
            <>
            <HeaderAdmin />
            <TestForm />
            <Footer />
            </>
        }

        </>
    )
}

export default CreateTest