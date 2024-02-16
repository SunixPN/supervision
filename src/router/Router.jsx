import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../components/screens/Home/Home"
import Admin from "../components/screens/Admin/Admin"
import Details from "../components/screens/Details/Details"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/admin" element={ <Admin /> } />
                <Route path="/news/:category/:id" element={ <Details /> }></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router