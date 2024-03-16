import { useSelector } from "react-redux"
import styles from "./UpAdmin.module.scss"
import { Link, useNavigate } from "react-router-dom"
import { useActions } from "../../../../../hooks/useActions"

const UpAdmin = () => {
    const auth = useSelector(state => state.auth)
    const { deauthorization } = useActions()
    const navigate = useNavigate()

    const handleClick = () => {
        localStorage.removeItem("success-token")
        deauthorization()
        navigate("/")
    }

    return (
        <div className={styles.up}>
            <div className={styles.box}>
                <div className={styles.settings}>
                    <img className={styles.image} src="/images/svg/user.svg" alt="user" />
                    <p className={styles.text}>{ auth.accountData.name + " " + auth.accountData.surname }</p>
                    <Link className={styles.button} to={"/admin/settings"}></Link>
                </div>
                <button onClick={handleClick} className={styles.buttonExit}>Выйти</button>
            </div>
        </div>
    )
}

export default UpAdmin