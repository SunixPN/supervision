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

    const { data: news, isLoading: loadNews } = useQuery({
        queryKey: ["newsLimit"],
        queryFn: () => NewsService.getNewsWithLimit(14),
        retry: 2
    })

    const { initialCategory, initialNews } = useActions()

    const initial = () => {
        if (category) {
            initialCategory(category.categories)
        }

        if (news) {
            initialNews(news.data.news)
        }
    }

    return { loadCategory, loadNews, initial }
}