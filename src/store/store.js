import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as news } from "./news/news.slice"
import { reducer as category } from "./category/category.slice"
import { reducer as auth } from "./auth/auth.slice";
import { reducer as popular } from "./popular/popular.slice";

const reducers = combineReducers({
    news, 
    category,
    auth,
    popular
})

export const store = configureStore({
    reducer: reducers
})