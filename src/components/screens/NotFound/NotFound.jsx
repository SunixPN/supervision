import Header from './../../../layouts/Header/Header';
import Footer from './../../../layouts/Footer/Footer';
import { useQuery } from 'react-query';
import { CategoryService } from './../../../services/CategoryService';
import { useEffect } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useSelector } from 'react-redux';
import Loader from './../../ui/Loader/Loader';
import FoundBox from './FoundBox/FoundBox';

const NotFound = () => {
    const { data: category, isLoading: loadCategory } = useQuery({
        queryKey: ["category"],
        queryFn: CategoryService.getAllCategories
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
            loadCategory || categories.length === 0 ?
            <Loader pageLoading={true} text={"загрузка данных"} />
            :
            <>
            <Header />
            <FoundBox />
            <Footer />
            </>
        }
        </>
    )
}

export default NotFound