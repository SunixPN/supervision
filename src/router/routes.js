import Admin from "../components/screens/Admin/Admin";
import Category from "../components/screens/Category/Category";
import DeleteNews from "../components/screens/DeleteNews/DeleteNews";
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
    },
    {
        id: 3,
        path: "/category/:category",
        element: Category
    }
]

export const privateRoutes = [
    ...publicRoutes,
    {
        id: 3,
        path: "/admin",
        element: Admin
    },
    {
        id: 4,
        path: "/admin/deleteNews",
        element: DeleteNews
    }
]