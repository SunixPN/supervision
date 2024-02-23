import { useQuery } from 'react-query';
import { useActions } from './useActions';
import { CategoryService } from './../services/CategoryService';
import { NewsService } from './../services/NewsService';

export const useData = () => {
    const { data: category, isLoading: loadCategory } = useQuery({
        queryKey: ["category"],
        queryFn: CategoryService.getAllCategories,
        retry: 2
    })

    const { data: dataNews, isLoading: loadNews } = useQuery({
        queryKey: ["newsLimit", 1],
        queryFn: () => NewsService.getNewsWithLimit(10, 1),
        retry: 2
    })

    const { initialCategory, initialNews, initialPopular } = useActions()

    const initial = () => {
        if (category) {
            initialCategory(category.categories[0].categories)
        }

        if (dataNews) {
            initialPopular(dataNews.news)
            initialNews(dataNews.news)
        }
    }

    return { loadCategory, loadNews, initial }
}