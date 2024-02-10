import { Link } from "react-router-dom"
import styles from "./Button.module.scss"

const Button = ({ children, link }) => {
    return (
        <Link to={link} className={styles.button}>
            { children }
        </Link>
    )
}

export default Button