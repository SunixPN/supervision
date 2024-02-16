import Router from "./router/Router"
import { useActions } from "./hooks/useActions"
import { useQuery } from 'react-query';
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

    const initial = () => {
        if (news) {
            initialCategory(category.categories)
        }

        if (category) {
            initialNews(news.news)
        }

        return <Router />
    }

    return (
        <>
            {
                (loadNews || loadCategory) ? <Loader text={"Подгрузка данных"} />
                :
                <>
                    {
                        initial()
                    }
                </>

            }

        </>
    )
}

export default App
