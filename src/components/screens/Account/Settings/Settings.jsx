import { useRef, useState } from "react"
import Input from "../../../ui/Input/Input"
import styles from "./Settings.module.scss"
import { useSelector } from "react-redux"
import InfoBox from "./InfoBox/InfoBox"
import { useMutation, useQueryClient } from "react-query"
import { AuthService } from "../../../../services/AuthService"
import Loader from "../../../ui/Loader/Loader"
import SnackBar from './../../Admin/CreateNews/TextEditor/ControllerList/SnackBar/SnackBar';
import Error from "./Error/Error"

const Settings = () => {
    const auth = useSelector(state => state.auth)

    const [formState, setFormState] = useState({...auth.accountData, password: ""})
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openError, setOpenError] = useState(false)
    const [isInvalidate, setIsInvalidate] = useState(false) 
    const [errors, setErrors] = useState({ newPassword: false, repeatPassword: false })
    const [repeat, setRepeat] = useState("")

    const nameRef = useRef(null)
    const surnameRef = useRef(null)

    const queryClient = useQueryClient()

    const borderStylePassword = errors.newPassword ? {
        borderColor: "#FF4F52",
    }
    :
    null

    const borderStyleRepeat = errors.repeatPassword ? {
        borderColor: "#FF4F52"
    }
    :
    null

    const { mutateAsync, isLoading } = useMutation({
        mutationKey: ["patchPassword", formState.password],
        mutationFn: (body) => AuthService.changePassword(body),
        onSuccess: () => {
            setIsInvalidate(true)
            queryClient.invalidateQueries({ queryKey: ["account"], refetchActive: true })
            setIsInvalidate(false)
            setOpenSuccess(true)
        },
        onError: () => setOpenError(true)
    })

    const handleClick = async () => {
        if (!formState.password) {
            setErrors({...errors, newPassword: true})
        }

        else if (repeat !== formState.password) {
            setErrors({ ...errors, repeatPassword: true })
        }

        else {
            await mutateAsync({ login: formState.login, password: formState.password })
        }
    }

    const handleChangePassword = (event) => {
        if (!!event.target.value) {
            setErrors({...errors, newPassword: false})
        }
    
        setFormState({...formState, password: event.target.value})
    }

    const handleChangeRepeat = (event) => {
        if (event.target.value === formState.password) {
            setErrors({ ...errors, repeatPassword: false })
        }

        setRepeat(event.target.value)
    }

    return (
        <>
        <SnackBar open={openSuccess} setOpen={setOpenSuccess} severity={"success"} text={"Изменения проведены успешно"} />
        <SnackBar open={openError} setOpen={setOpenError} severity={"error"} text={"Не удалось провести изменения"} />
        <section className={styles.settigns}>
            <div className="wrapper">
                <div className={styles.content}>
                    <img className={styles.image} src="/images/svg/user.svg" alt="user" />
                    <address className={styles.info}>
                        <div className={styles.infoUser}>
                            <h2 className={styles.title}>Информация об аккаунте</h2>
                            <div className={styles.infoBoxes}>
                                <InfoBox ref={nameRef} text={"Имя"} property={"name"} formState={formState} setFormState={setFormState}/>
                                <InfoBox ref={surnameRef} text={"Фамилия"} property={"surname"} formState={formState} setFormState={setFormState} />
                            </div>
                        </div>
                        <div className={styles.infoPassword}>
                            <h2 className={styles.title}>Изменить пароль</h2>
                            <div className={styles.passwords}>
                                <div className={styles.container}>
                                    <Input
                                    style={borderStylePassword}
                                    value={formState.password}
                                    onChange={handleChangePassword} 
                                    placeholder={"Введите новый пароль"} 
                                    type="password" 
                                    />
                                    <Error active={errors.newPassword}>Обязательное поле</Error>
                                </div>
                                <div className={styles.container}>
                                    <Input
                                    style={borderStyleRepeat}
                                    value={repeat}
                                    onChange={handleChangeRepeat} 
                                    placeholder={"Повторите новый пароль"} 
                                    type="password" 
                                    />
                                    <Error active={errors.repeatPassword}>Пароли не совпадают</Error>
                                </div>
                            </div>
                            <button onClick={handleClick} className={styles.button}>Подтвердить изменения</button>
                        </div>
                    </address>
                </div>
            </div>
        </section>
        { (isLoading || isInvalidate) && <Loader pageLoading={false} text={"Изменение данных аккаунта"} /> }
        </>
    )
}

export default Settings