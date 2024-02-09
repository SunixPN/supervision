import styles from "./Login.module.scss"

const Login = () => {
    return (
        <div className={styles.login}>
            <img className={styles.image} src="/images/svg/user.svg" alt="user" />
            <p className={styles.text}>Войти в админ панель</p>
            <button className={styles.button}></button>
        </div>
    )
}

export default Login