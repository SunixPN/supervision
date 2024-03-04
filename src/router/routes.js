import Admin from "../components/screens/Admin/Admin";
import Category from "../components/screens/Category/Category";
import Details from "../components/screens/Details/Details";
import EditNews from "../components/screens/EditNews/EditNews";
import Home from "../components/screens/Home/Home";
import Searching from "../components/screens/Searching/Searching";
import NewsControl from './../components/screens/NewsControl/NewsControl';

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
    },
    {
        id: 4,
        path: "/search/:query",
        element: Searching
    }
]

export const privateRoutes = [
    ...publicRoutes,
    {
        id: 5,
        path: "/admin",
        element: Admin
    },
    {
        id: 6,
        path: "/admin/newsControl",
        element: NewsControl
    },
    {
        id: 7,
        path: "/newsEdit/:category/:id",
        element: EditNews
    }
]