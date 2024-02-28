import { useMutation } from "react-query"
import { useActions } from "./hooks/useActions"
import Router from "./router/Router"
import { AuthService } from "./services/AuthService"
import { useEffect, useState } from "react"
import Loader from "./components/ui/Loader/Loader"
import SnackBar from "./components/screens/Admin/CreateNews/TextEditor/ControllerList/SnackBar/SnackBar"


const App = () => {
    const { authorization } = useActions()
    const [error, setError] = useState(false)

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: AuthService.checkAuth,
        onSuccess: () => {
            authorization()
        },
        retry: false
    })

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await mutateAsync()
            }

            catch {
                setError(true)
            }
        }

        if (localStorage.getItem("success-token")) {
            checkAuth()
        }
    }, [])
    
    return (
        <>
        {
            isLoading ? <Loader pageLoading={true} text={"Загрузка данных"} />
            :
            <>            
            <Router />  
            <SnackBar open={error} setOpen={setError} severity={"info"} text={"Срок действия авторизации истек"} />
            </>
        }
        </>
    )
}

export default App
