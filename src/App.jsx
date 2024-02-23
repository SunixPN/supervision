import { useMutation } from "react-query"
import { useActions } from "./hooks/useActions"
import Router from "./router/Router"
import { AuthService } from "./services/AuthService"
import { useEffect } from "react"


const App = () => {
    const { authorization } = useActions()

    const { mutateAsync } = useMutation({
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

            catch (error) {
                console.log(error.message)
            }
        }

        if (localStorage.getItem("success-token")) {
            checkAuth()
        }
    }, [])
    
    return (
        <>
        <Router />   
        </>
    )
}

export default App
