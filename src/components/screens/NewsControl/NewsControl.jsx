import HeaderAdmin from '../Admin/HeaderAdmin/HeaderAdmin';
import Footer from "../../../layouts/Footer/Footer"
import { useQuery } from 'react-query';
import { NewsService } from '../../../services/NewsService';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../../hooks/useActions';
import Loader from '../../ui/Loader/Loader';
import NewsController from './NewsController/NewsController';
import { AuthService } from '../../../services/AuthService';
import TestLink from '../../ui/TestLink/TestLink';

const NewsControl = () => {
    const { data: dataNews, isLoading } = useQuery({
        queryKey: ["newsLimit", 1],
        queryFn: () => NewsService.getNewsWithLimit(10, 1)
    })

    const { data: acc, isLoading: loadAcc } = useQuery({
        queryKey: ["account"],
        queryFn: AuthService.getAccount
    })

    const news = useSelector(state => state.news)
    const auth = useSelector(state => state.auth)
    const { initialNews, initialPopular, setAccountData } = useActions()

    useEffect(() => {
        if (dataNews) {
            initialNews(dataNews.news)
            initialPopular(dataNews.news)
        }

        if (acc) {
            setAccountData(acc.accInfo[0])
        }

    }, [dataNews, acc])
    
    return (
        (isLoading || news.length === 0 || loadAcc || Object.keys(auth.accountData).length === 0)
        ?
        <Loader pageLoading={true} text={"Загрузка данных"} />
        : 
        <>
        <HeaderAdmin />
        <NewsController news={news} />
        <Footer />
        <TestLink isAdmin={true} />
        </>
    )
}

export default NewsControl