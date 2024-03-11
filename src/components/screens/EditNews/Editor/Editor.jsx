import { useEffect, useRef, useState } from "react"
import TextEditor from "../../Admin/CreateNews/TextEditor/TextEditor"
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import { createDecorator, findEntitiesOf, findEntitiesOfLink } from "contenido"
import Image from "../../Admin/CreateNews/TextEditor/Image/Image"
import { useNavigate, useParams } from "react-router-dom"
import styles from "./Editor.module.scss"
import Form from "../../Admin/CreateNews/Form/Form"
import { useValidate } from "../../../../hooks/useValidate"
import Link from './../../Admin/CreateNews/TextEditor/Link/Link';
import { useMutation, useQueryClient } from "react-query"
import { NewsService } from "../../../../services/NewsService"
import SnackBar from './../../Admin/CreateNews/TextEditor/ControllerList/SnackBar/SnackBar';
import Loader from './../../../ui/Loader/Loader';
import { translit } from './../../../../utils/translit';

const Editor = ({ news }) => {
    const ref = useRef(null)
    const { id, category } = useParams() 
    const newsPaper = news.find(newsPaper => newsPaper.newsId === id)

    const defaultState = {
        categoryName: newsPaper?.categoryName,
        title: newsPaper?.title,
        subTitle: newsPaper?.subTitle,
        titleImageUrl: newsPaper?.titleImageUrl
    }

    const navigate = useNavigate()

    const [formState, setFormState] = useState(defaultState)
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openError, setOpenError] = useState(false)
    const [isInvalidate, setIsInvalidate] = useState(false)
    const [validateError, setValidateError] = useState(false)
    const { setValidate, validate, validateFn } = useValidate()

    const queryClient = useQueryClient()

    const invalidate = async () => {
        queryClient.invalidateQueries({ queryKey: ["newsLimit"], refetchInactive: true })
        queryClient.invalidateQueries({ queryKey: ["newsByCategory", category] })
        queryClient.invalidateQueries({ queryKey: ["newsByCategory", translit(formState.categoryName)], refetchInactive: true })
    }

    const { isLoading, mutateAsync } = useMutation({
        mutationKey: ["newsPatch"],
        mutationFn: (body) => NewsService.patchNews(body),
        onSuccess: async () => {
            setIsInvalidate(true)
            await invalidate()
            setIsInvalidate(false)
            setOpenSuccess(true)
            navigate(`/newsEdit/${translit(formState.categoryName)}/${id}`)
        },
        onError: () => setOpenError(true)
    })

    const decorators = createDecorator([
        {
            component: Image,
            strategy: findEntitiesOf("image")
        },
        {
            component: Link,
            strategy: findEntitiesOfLink
        }
    ])

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorators))

    useEffect(() => {
        if (ref.current) {
            ref.current.update(EditorState.push(editorState, convertFromRaw(newsPaper.settings)))
        }
    }, [ref])

    const handleEdit = async () => {
        const isInValid = Object.values(validateFn(formState)).some(value => value)

        if (isInValid) {
            setValidateError(true)
            return
        }

        const content = ref.current?.editorContainer.firstElementChild.innerHTML
        await mutateAsync({
            ...formState, 
            newsContent: content, 
            titleForSearch: formState.title.toLowerCase(),
            settings: convertToRaw(editorState.getCurrentContent()),
            newsId: id
        })
    }

    return (
        <>
        <SnackBar text={"Новость успешно отредактирована"} open={openSuccess} setOpen={setOpenSuccess} severity={"success"} />
        <SnackBar text={"Ошибка редактирования"} open={openError} setOpen={setOpenError} severity={"error"} />
        <SnackBar text={"Обязательные поля не заполнены!"} open={validateError} setOpen={setValidateError} severity={"error"} />
        <section className={styles.section}>
            <div className="wrapper">
                <div className={styles.content}>
                    <Form validate={validate} setValidate={setValidate} formState={formState} setFormState={setFormState} />
                    <h2 className={styles.title}>Редактирование новости "{newsPaper?.title}"</h2>
                    <TextEditor editorState={editorState} setEditorState={setEditorState} ref={ref} />
                    <button onClick={handleEdit} className={styles.button}>Отредактировать новость</button>
                </div>
            </div>
        </section>
        {
            (isLoading || isInvalidate) && <Loader pageLoading={false} text={"Редактирование новости"} />  
        }
        </>
    )
}

export default Editor