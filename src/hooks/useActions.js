import { useDispatch } from "react-redux"
import { actions as newsActions } from "../store/news/news.slice"
import { useMemo } from "react"
import { bindActionCreators } from "@reduxjs/toolkit"
import { actions as categoryActions } from "../store/category/category.slice"
import { actions as authActions } from "../store/auth/auth.slice"
import { actions as popularActions } from "../store/popular/popular.slice"
import { actions as queriesActions } from "../store/queries/queries.slice"

const rootActions = {
    ...categoryActions,
    ...newsActions,
    ...authActions,
    ...popularActions,
    ...queriesActions
}

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}