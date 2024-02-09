import { useState, useEffect } from "react"
import styles from "./Burger.module.scss"
import { navigate } from "../../../../data/nav"
import { Link } from "react-router-dom"

const Burger = ({ index }) => {
    const [active, setActive] = useState(false)

    const classes = [styles.menu, active ? styles.active : ""]

    return (
        <>
            <button onClick={() => setActive(prev => !prev)} className={styles.button} />
            <nav className={classes.join(" ")}>
                <ul className={styles.list}>
                    {
                        navigate.slice(index).map(nav => 
                            <li key={nav.id}>
                                <Link className={styles.link} to={nav.link}>{nav.title}</Link>
                            </li>
                        )
                    }
                </ul>
            </nav>
        </>
    )
}

export default Burger