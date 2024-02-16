import Router from "./router/Router"
import { useActions } from "./hooks/useActions"
import { useQuery } from 'react-query';
import { useEffect } from "react";
import { CategoryService } from "./services/CategoryService";
import { NewsService } from './services/NewsService';
import Loader from "./components/ui/Loader/Loader";

const App = () => {
    const { data: category, isLoading: loadCategory } = useQuery({
        queryKey: ["category"],
        queryFn: CategoryService.getAllCategories,
        retry: 2
    })

    const { data: news, isLoading: loadNews } = useQuery({
        queryKey: ["news"],
        queryFn: NewsService.getNews,
        retry: 2
    })

    const { initialCategory, initialNews } = useActions()

    useEffect(() => { 
        category && initialCategory(category.categories)
        news && initialNews(news.news)
    }, [category])

    return (
        <>
            {
                (loadCategory || loadNews) ? <Loader text={"Подгрузка данных"} />
                :
                <Router />
            }

        </>
    )
}

export default App
