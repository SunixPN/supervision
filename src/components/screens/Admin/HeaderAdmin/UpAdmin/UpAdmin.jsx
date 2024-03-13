import { useSelector } from "react-redux"
import styles from "./UpAdmin.module.scss"
import { Link } from "react-router-dom"

const UpAdmin = () => {
    const auth = useSelector(state => state.auth)
    return (
        <div className={styles.up}>
            <div className={styles.settings}>
                <img className={styles.image} src="/images/svg/user.svg" alt="user" />
                <p className={styles.text}>{ auth.accountData.name + " " + auth.accountData.surname }</p>
                <Link className={styles.button} to={"/admin/settings"}></Link>
            </div>
        </div>
    )
}

export default UpAdmin