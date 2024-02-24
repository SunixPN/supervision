import { forwardRef, useEffect, useState } from "react"
import styles from "./Pagination.module.scss"
import { useQuery } from "react-query"
import { NewsService } from "../../../../../services/NewsService"
import { useActions } from "../../../../../hooks/useActions"
import SnackLoader from "./SnackLoader/SnackLoader"
import SnackBar from "../../../Admin/CreateNews/TextEditor/ControllerList/SnackBar/SnackBar"

const Pagination = forwardRef((__, ref) => {
    const [page, setPage] = useState(1)
    const [active, setActive] = useState({ activePrev: page !== 1, activeNext: true })
    const [first, setFirst] = useState(true)
    const [errorActive, setErrorActive] = useState(false)
    const [firstQuery, setFirstQuery] = useState(true)
    const [endPage, setEndPage] = useState(null)

    const { initialNews } = useActions()

    const { data: dataNews, isLoading } = useQuery({
        queryKey: ["newsLimit", page],
        queryFn: () => NewsService.getNewsWithLimit(10, page),
        staleTime: Infinity
    })

    useEffect(() => {
        if (dataNews) {

            if (dataNews.news.length === 0) {

                if (firstQuery) {
                    setEndPage(page)
                    setErrorActive(true)
                    setFirstQuery(false)
                    setPage(prev => prev - 1)
                }

                setActive({...active, activeNext: false})
            }

            else if (first) {
                initialNews(dataNews.news)
                setFirst(false)
            }

            else {
                ref.current.scrollIntoView({ block: "start" })
                initialNews(dataNews.news)
            }
        }
    }, [dataNews])

    const prevHandleClick = () => {
        if (page !== 1) {
            ref.current.scrollIntoView({ block: "start" })
            setActive({...active, activeNext: true})

            if (page === 2) {
                setActive({activeNext: true, activePrev: false})
            }

            setPage(prev => prev -1)
        }
    }

    const nextHandleClick = () => {
        if (page === endPage - 2 && active.activeNext) {
            ref.current.scrollIntoView({ block: "start" })
            setActive({activePrev: true, activeNext: false})
            setPage(prev => prev + 1)
        }

        else if (active.activeNext) {
            ref.current.scrollIntoView({ block: "start" })
            setPage(prev => prev + 1)
            setActive({...active, activePrev: true})
        }

      
    }

    return (
        <>
        <SnackBar open={errorActive} setOpen={setErrorActive} severity={"error"} text={"Больше новостей нету"} />
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
})

export default Pagination