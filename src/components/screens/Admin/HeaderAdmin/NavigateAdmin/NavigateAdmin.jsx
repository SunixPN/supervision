import styles from "./NavigateAdmin.module.scss"
import { adminNavigate } from "../../../../../data/adminNavigate"
import { Link } from "react-router-dom"
import Burger from "../../../../../layouts/Header/Navigate/Burger/Burger"
import { useEffect, useState } from "react"

const NavigateAdmin = () => {
    const [activeBurger, setActiveBurger] = useState(window.innerWidth <= 789 ? true : false)

    const handleResize = () => {
        if (window.innerWidth <= 900) {
            setActiveBurger(true)
        }

        else {
            setActiveBurger(false)
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
                activeBurger && <Burger admin={true} category={adminNavigate} index={0} />
            }
            <div className="wrapper">
                {
                    !activeBurger &&
                    <ul className={styles.list}>
                        {
                            adminNavigate.map(nav => 
                                <li key={nav.id} className={styles.elem}>
                                    <Link className={styles.link} to={nav.link}>{nav.title}</Link>
                                </li>
                            )
                        }
                    </ul>
                }
            </div>
        </nav>
    )
}

export default NavigateAdmin