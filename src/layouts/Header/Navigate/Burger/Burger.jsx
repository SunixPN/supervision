import { useEffect, useRef, useState } from "react"
import styles from "./Burger.module.scss"
import { Link } from "react-router-dom"

const Burger = ({ category, index, admin = false }) => {
    const [active, setActive] = useState(false)

    const classes = [styles.menu, active ? styles.active : ""]
    const ref = useRef(null)

    useEffect(() => {
       
        const handleClick = (event) => { !ref.current.contains(event.target) && setActive(false) }

        window.addEventListener("click", handleClick)

        return () => {
            window.removeEventListener("click", handleClick)
        }
    }, [])

    return (
        <div ref={ref}>
            <button onClick={() => setActive(prev => !prev)} className={styles.button} />
            <nav className={classes.join(" ")}>
                <ul className={styles.list}>
                    {
                        category.slice(index).map(nav => 
                            <li onClick={() => setActive(false)} key={admin ? nav.id : nav.categoryId}>
                                <Link className={styles.link} to={admin ? nav.link : nav.categoryLink}>{admin ? nav.title : nav.categoryName}</Link>
                            </li>
                        )
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Burger