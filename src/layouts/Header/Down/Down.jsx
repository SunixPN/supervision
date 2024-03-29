import { Link } from "react-router-dom"
import styles from "./Down.module.scss"
import Time from "./Time/Time"

const Down = () => {
    return (
        <div className={styles.down}>
            <div className={styles.left}>
                <img className={styles.image} src="/images/other/blog.png" alt="blog" />
                <p className={styles.text}>Портал для кураторства</p>
            </div>
            <Link className={styles.link} to={"/"}>
                <span className={styles.title}>Universal</span>
            </Link>
            <Time />
        </div>
    )
}

export default Down