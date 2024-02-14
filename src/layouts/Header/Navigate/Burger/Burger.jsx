import { useState } from "react"
import styles from "./Burger.module.scss"
import { Link } from "react-router-dom"

const Burger = ({ category, index }) => {
    const [active, setActive] = useState(false)

    const classes = [styles.menu, active ? styles.active : ""]

    return (
        <>
            <button onClick={() => setActive(prev => !prev)} className={styles.button} />
            <nav className={classes.join(" ")}>
                <ul className={styles.list}>
                    {
                        category.slice(index).map(nav => 
                            <li key={nav.categoryId}>
                                <Link className={styles.link} to={nav.categoryLink}>{nav.categoryName}</Link>
                            </li>
                        )
                    }
                </ul>
            </nav>
        </>
    )
}

export default Burger