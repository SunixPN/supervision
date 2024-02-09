import styles from "./Search.module.scss"

const Search = () => {
    return (
        <div className={styles.search}>
            <img className={styles.image} src="/images/svg/search.svg" alt="search" />
            <input className={styles.input} type="text" placeholder="Поиск" />
        </div>
    )
}

export default Search