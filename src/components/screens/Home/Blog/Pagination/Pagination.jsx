import { useEffect, useState } from "react"
import styles from "./Pagination.module.scss"
import { useQuery } from "react-query"
import { NewsService } from "../../../../../services/NewsService"
import { useActions } from "../../../../../hooks/useActions"
import SnackLoader from "./SnackLoader/SnackLoader"

const Pagination = () => {
    const [page, setPage] = useState(1)
    const [active, setActive] = useState({ activePrev: page !== 1, activeNext: true })

    const { initialNews } = useActions()

    const { data: dataNews, isLoading } = useQuery({
        queryKey: ["newsLimit", page],
        queryFn: () => NewsService.getNewsWithLimit(10, page),
        staleTime: Infinity
    })

    useEffect(() => {
        if (dataNews) {
            initialNews(dataNews.news)
        }
    }, [dataNews])

    const prevHandleClick = () => {
        if (page !== 1) {

            if (page === 2) {
                setActive({...active, activePrev: false})
            }

            setPage(prev => prev -1)
        }
    }

    const nextHandleClick = () => {
        setPage(prev => prev + 1)
        setActive({...active, activePrev: true})
    }

    return (
        <>
        <SnackLoader open={isLoading} />
        <div className={styles.pagintaion}>
            <button 
            onClick={prevHandleClick} 
            className={[active.activePrev ? styles.button : styles.disable, styles.prev].join(" ")} 
            />

            <button 
            onClick={nextHandleClick} 
            className={[active.activeNext ? styles.button : styles.disable].join(" ")} 
            />
        </div>
        </>
    )
}

export default Pagination