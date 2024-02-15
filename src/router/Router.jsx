import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../components/screens/Home/Home"
import Admin from "../components/screens/Admin/Admin"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/admin" element={ <Admin /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default Router