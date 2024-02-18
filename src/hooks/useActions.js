import { useDispatch } from "react-redux"
import { actions as newsActions } from "../store/news/news.slice"
import { useMemo } from "react"
import { bindActionCreators } from "@reduxjs/toolkit"
import { actions as categoryActions } from "../store/category/category.slice"
import { actions as authActions } from "../store/auth/auth.slice"

const rootActions = {
    ...categoryActions,
    ...newsActions,
    ...authActions
}

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}