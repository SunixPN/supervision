import styles from "./Search.module.scss"
import { useSelector } from "react-redux"
import { useActions } from "../../../../hooks/useActions"
import { useNavigate } from "react-router-dom"

const Search = () => {
    const { setQuery } = useActions()
    const search = useSelector(state => state.search)

    const navigate = useNavigate()

    const handleChange = (event) => {
        setQuery(event.target.value)
    }

    const handleClick = () => {
        if (search.query !== "") {
            setQuery("")
            return navigate(`/search/${search.query}`)
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && search.query !== "") {
            setQuery("")
            return navigate(`/search/${search.query}`)
        } 
    }

    return (
        <div className={styles.search}>
            <img onClick={handleClick} className={styles.image} src="/images/svg/search.svg" alt="search" />
            <input
            onKeyDown={handleKeyDown} 
            onChange={handleChange}
            value={search.query} 
            className={styles.input} 
            type="text" 
            placeholder="Поиск" 
            />
        </div>
    )
}

export default Search