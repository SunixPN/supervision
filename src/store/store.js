import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as news } from "./news/news.slice"
import { reducer as category } from "./category/category.slice"

const reducers = combineReducers({
    news, 
    category
})

export const store = configureStore({
    reducer: reducers
})