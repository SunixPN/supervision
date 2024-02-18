import Admin from "../components/screens/Admin/Admin";
import Details from "../components/screens/Details/Details";
import Home from "../components/screens/Home/Home";

export const publicRoutes = [
    {
        id: 1,
        path: "/",
        element: Home
    },
    {
        id: 2,
        path: "/news/:category/:id",
        element: Details
    }
]

export const privateRoutes = [
    ...publicRoutes,
    {
        id: 3,
        path: "/admin",
        element: Admin
    }
]