import { useQuery } from 'react-query';
import { useActions } from './useActions';
import { CategoryService } from './../services/CategoryService';
import { NewsService } from './../services/NewsService';

export const useData = () => {
    const { data: category, isLoading: loadCategory, isFetchedAfterMount: fetchedCategory } = useQuery({
        queryKey: ["category"],
        queryFn: CategoryService.getAllCategories,
        retry: 2
    })

    const { data: dataNews, isLoading: loadNews, isFetchedAfterMount: fetchedNews } = useQuery({
        queryKey: ["newsLimit", 1],
        queryFn: () => NewsService.getNewsWithLimit(10, 1),
        retry: 2
    })

    const { initialCategory, initialNews, initialPopular } = useActions()

    const initial = () => {
        if (category && fetchedCategory) {
            initialCategory(category.categories[0].categories)
        }

        if (dataNews && fetchedNews) {
            initialPopular(dataNews.news)
            initialNews(dataNews.news)
        }
    }

    return { loadCategory, loadNews, initial }
}