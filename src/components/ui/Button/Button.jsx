import { Link } from "react-router-dom"
import styles from "./Button.module.scss"

const Button = ({ children }) => {
    return (
        <Link className={styles.button}>
            { children }
        </Link>
    )
}

export default Button