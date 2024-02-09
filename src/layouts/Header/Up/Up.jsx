import Login from "./Login/Login"
import Search from "./Search/Search"
import styles from "./Up.module.scss"

const Up = () => {
    return (
        <div className={styles.up}>
            <Search />
            <Login />
        </div>
    )
}

export default Up