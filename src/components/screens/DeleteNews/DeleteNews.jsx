import HeaderAdmin from './../Admin/HeaderAdmin/HeaderAdmin';
import Footer from "../../../layouts/Footer/Footer"
import NewsDeleter from './NewsDeleter/NewsDeleter';
import { useQuery } from 'react-query';
import { NewsService } from '../../../services/NewsService';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../../hooks/useActions';
import Loader from '../../ui/Loader/Loader';

const DeleteNews = () => {
    const { data: dataNews, isLoading } = useQuery({
        queryKey: ["newsLimit", 1],
        queryFn: () => NewsService.getNewsWithLimit(10, 1)
    })

    const news = useSelector(state => state.news)
    const { initialNews } = useActions()

    useEffect(() => {
        if (dataNews) {
            initialNews(dataNews.news)
        }

    }, [dataNews])
    return (
        isLoading || news.length === 0
        ?
        <Loader pageLoading={true} text={"Загрузка данных"} />
        : 
        <>
        <HeaderAdmin />
        <NewsDeleter news={news} />
        <Footer />
        </>
    )
}

export default DeleteNews