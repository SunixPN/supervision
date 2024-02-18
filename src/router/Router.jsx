import { BrowserRouter, Routes, Route } from "react-router-dom"
import { publicRoutes, privateRoutes } from "./routes"
import { useSelector } from "react-redux"
import NotFound from "../components/screens/NotFound/NotFound"

const Router = () => {
    const auth = useSelector(state => state.auth)
    return (
        <BrowserRouter>
            <Routes>
                {
                    auth.auth
                    ?
                    <>
                    {
                        privateRoutes.map(route => <Route key={route.id} path={route.path} element={<route.element />} />)
                    }
                    <Route path="*" element={<NotFound />} />
                    </>
                    :
                    <>
                    {
                        publicRoutes.map(route => <Route key={route.id} path={route.path} element={<route.element />} />)
                    }
                    <Route path="*" element={<NotFound />} />
                    </>

                }
            </Routes>
        </BrowserRouter>
    )
}

export default Router