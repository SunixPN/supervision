import { useActions } from "./hooks/useActions"
import Router from "./router/Router"


const App = () => {
    const { authorization } = useActions()

    if (localStorage.getItem("auth")) {
        authorization()
    }
    
    return (
        <>
        <Router />   
        </>
    )
}

export default App
