import { useParams } from "react-router-dom"
import Footer from "../../../layouts/Footer/Footer"
import Header from "../../../layouts/Header/Header"
import TestComponent from "./TestComponent/TestComponent"
import { useQuery } from "react-query"
import { TestService } from "../../../services/TestSerice"
import Loader from "../../ui/Loader/Loader"
import { useEffect, useState } from "react"
import { CategoryService } from "../../../services/CategoryService"
import { useActions } from "../../../hooks/useActions"

const TestDetail = () => {
    const { id } = useParams()
    const [currentTest, setCurrentTest] = useState({})

    const { data: categories, isLoading: loadCategories } = useQuery({
        queryKey: ["category"],
        queryFn: CategoryService.getAllCategories
    })

    const { initialCategory } = useActions()

    const { data: tests, isLoading: loadTests } = useQuery({
        queryKey: ["tests"],
        queryFn: TestService.getTest
    })

    useEffect(() => {
        if (tests) {
            setCurrentTest(tests.categories.find(test => test.testId === id))
        }

        if (categories) {
            initialCategory(categories.categories[0].categories)
        }
    }, [tests, categories])
    
    return (
        <>
        {
            loadTests || Object.keys(currentTest).length === 0 || loadCategories ?
            <Loader text={"Загрузка данных"} pageLoading={true} />
            :
            <>
            <Header />
            <TestComponent testContent={currentTest.testContent} />
            <Footer />
            </>
        }
        </>
    )
}

export default TestDetail