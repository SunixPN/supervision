import { useSelector } from "react-redux";
import styles from "./Login.module.scss"
import { Link, useNavigate } from 'react-router-dom';
import { useActions } from './../../../../hooks/useActions';
import { useState } from "react";
import ModalWindow from "../../../../components/ui/ModalWindow/ModalWindow";
import Input from "../../../../components/ui/Input/Input"
import { useMutation } from "react-query";
import { AuthService } from "../../../../services/AuthService";

const Login = () => {
    const [modalActive, setModalActive] = useState(false)

    const auth = useSelector(state => state.auth)

    const { authorization } = useActions()

    const [formData, setFormData] = useState({
        login: "",
        password: ""
    })

    const navigate = useNavigate()

    const { mutateAsync } = useMutation({
        mutationFn: (body) => AuthService.authPost(body),
        onSuccess: () => {
            setModalActive(false)
            authorization()
            localStorage.setItem("auth", "true")
            return navigate("/admin")
        },
        onError: () => console.log("ERROR")
    })

    const handleClick = async (event) => {
        event.preventDefault()
        await mutateAsync(formData)
    }

    return (
        <>
        <div className={styles.login}>
            <img className={styles.image} src="/images/svg/user.svg" alt="user" />
            {
                auth.auth
                ?
                <>
                    <p className={styles.text}>Админ</p>
                    <Link className={styles.button} to={"/admin"}></Link>
                </>
                :
                <>
                <p className={styles.text}>Войти</p>
                <button onClick={() => setModalActive(true)} className={styles.button}></button>
                </>
            }
        </div>
        <ModalWindow active={modalActive} setActive={setModalActive}>
            <h3 className={styles.title}>Войдите в админ панель</h3>
            <form className={styles.form}>
                <Input value={formData.login} onChange={(event) => setFormData({...formData, login: event.target.value})} placeholder="Логин" />
                <Input value={formData.password} onChange={(event) => setFormData({...formData, password: event.target.value})} type="password" placeholder="Пароль" />
                <button onClick={handleClick} className={styles.buttonForm}>Войти</button>
            </form>
        </ModalWindow>
        </>
    )
}

export default Login