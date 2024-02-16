import styles from "./Login.module.scss"
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className={styles.login}>
            <img className={styles.image} src="/images/svg/user.svg" alt="user" />
            <p className={styles.text}>Войти</p>
            <Link to={"/admin"} className={styles.button}></Link>
        </div>
    )
}

export default Login