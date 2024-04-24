import { useSelector } from "react-redux"
import styles from "./Footer.module.scss"
import { Link } from "react-router-dom"
import { memo } from "react"

const Footer = memo(() => {
    const colors = [
        {
            id: 1,
            color: "#FF4F52",
            left: "0"
        },
        {
            id: 2,
            color: "#AC8EE3",
            left: "20%"
        },
        {
            id: 3,
            color: "#4592FF",
            left: "40%"
        },
        {
            id: 4,
            color: "#FFA34D",
            left: "60%"
        },
        {
            id: 5,
            color: "#6E99AE",
            left: "80%"
        }
    ]

    const category = useSelector(state => state.category)

    return (
        <footer className={styles.footer}>
            <div className="wrapper">
                <div className={styles.content}>
                    {
                        colors.map(color => 
                        <span 
                            key={color.id} 
                            style={{backgroundColor: color.color, left: color.left}} 
                            className={styles.deco}>
                        </span>
                        )
                    }
                    <nav className={styles.nav}>
                        <ul className={styles.list}>
                            {
                                category.map(nav =>
                                    <li key={nav.categoryId} className={styles.elem}>
                                        <Link className={styles.link} to={nav.categoryLink}>{nav.categoryName}</Link>
                                    </li> 
                                )
                            }
                        </ul>
                    </nav>
                </div>
                <div className={styles.copyright}>
                        <p className={styles.text}>
                            Портал Universal разработан специально для кураторства
                        </p>
                        <p className={styles.copy}>© 2024 2PStudio</p>
                    </div>
            </div>
        </footer>


    )
})

export default Footer