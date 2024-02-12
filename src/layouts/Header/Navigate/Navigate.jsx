import styles from "./Navigate.module.scss"
import { Link } from "react-router-dom"
import { navigate } from "../../../data/nav"
import Burger from "./Burger/Burger"
import { useEffect, useState } from "react"

const Navigate = () => {
    const [endIndex, setEndIndex] = useState(window.innerWidth <= 924 ? window.innerWidth <= 480 ? 0 : 4 : 6)

    const [index, setIndex] = useState(window.innerWidth <= 924 ? window.innerWidth <= 480 ? 0 : 4 : 6)

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
                navigate.length > 6 && <Burger index={index} />
            }
            <div className="wrapper">
                <ul className={styles.list}>
                    {
                        navigate.slice(0, endIndex).map(nav => 
                            <li key={nav.id} className={styles.elem}>
                                <Link className={styles.link} to={nav.link}>{nav.title}</Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navigate