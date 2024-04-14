import Account from "../components/screens/Account/Account";
import Admin from "../components/screens/Admin/Admin";
import Category from "../components/screens/Category/Category";
import CategoryControl from "../components/screens/CategoryControl/CategoryControl";
import CreateTest from "../components/screens/CreateTest/CreateTest";
import Details from "../components/screens/Details/Details";
import EditNews from "../components/screens/EditNews/EditNews";
import Home from "../components/screens/Home/Home";
import Searching from "../components/screens/Searching/Searching";
import TestDetail from "../components/screens/TestDetail/TestDetail";
import Tests from "../components/screens/Tests/Tests";
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
    },
    {
        id: 5,
        path: "/tests",
        element: Tests
    },
    {
        id: 6,
        path: "/tests/:id",
        element: TestDetail
    }
]

export const privateRoutes = [
    ...publicRoutes,
    {
        id: 7,
        path: "/admin",
        element: Admin
    },
    {
        id: 8,
        path: "/admin/newsControl",
        element: NewsControl
    },
    {
        id: 9,
        path: "/newsEdit/:category/:id",
        element: EditNews
    },
    {
        id: 10,
        path: "/admin/categoryControl",
        element: CategoryControl
    },
    {
        id: 11,
        path: "/admin/settings",
        element: Account
    },
    {
        id: 12,
        path: "/admin/createTest",
        element: CreateTest
    }
]