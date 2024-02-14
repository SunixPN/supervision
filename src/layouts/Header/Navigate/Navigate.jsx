import styles from "./Navigate.module.scss"
import { Link } from "react-router-dom"
import Burger from "./Burger/Burger"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const Navigate = () => {
    const [endIndex, setEndIndex] = useState(window.innerWidth <= 924 ? window.innerWidth <= 480 ? 0 : 4 : 6)

    const [index, setIndex] = useState(window.innerWidth <= 924 ? window.innerWidth <= 480 ? 0 : 4 : 6)

    const category = useSelector(state => state.category)

    const handleResize = () => {
        if (window.innerWidth <= 924) {
            if (window.innerWidth <= 480) {
                setEndIndex(0)
                setIndex(0)
            }

            else {
                setEndIndex(4)
                setIndex(4)
            }
        }

        else {
            setEndIndex(6)
            setIndex(6)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <nav className={styles.nav}>
            {
                category.length > 6 && <Burger category={category} index={index} />
            }
            <div className="wrapper">
                <ul className={styles.list}>
                    {
                        category.slice(0, endIndex).map(nav => 
                            <li key={nav.categoryId} className={styles.elem}>
                                <Link className={styles.link} to={nav.categoryLink}>{nav.categoryName}</Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navigate