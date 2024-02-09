import Down from "./Down/Down"
import styles from "./Header.module.scss"
import Navigate from "./Navigate/Navigate"
import Up from "./Up/Up"

const Header = () => {
    return (
        <header className={styles.header}>
            <div className="wrapper">
                <div className={styles.content}>
                    <Up />
                    <Down />
                </div>
            </div>
            <Navigate />
        </header>
    )
}

export default Header