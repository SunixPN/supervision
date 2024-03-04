import TextEditor from './TextEditor/TextEditor';
import Form from './Form/Form';
import { useState, useRef } from 'react';
import styles from "./CreateNews.module.scss"
import { useMutation, useQueryClient } from 'react-query';
import { NewsService } from '../../../../services/NewsService';
import Loader from '../../../ui/Loader/Loader';
import SnackBar from './TextEditor/ControllerList/SnackBar/SnackBar';
import { EditorState, convertToRaw } from 'draft-js';
import { createDecorator, findEntitiesOf } from 'contenido';
import Image from './TextEditor/Image/Image';

const CreateNews = () => {
    const defaultValue = {
        categoryName: "Новости",
        title: "",
        subTitle: "",
        titleImageUrl: ""
    }

    const [openSuccess, setOpenSuccess] = useState(false)
    const [openError, setOpenError] = useState(false)
    const [formState, setFormState] = useState(defaultValue)
    const [isInvalidate, setIsInvalidate] = useState(false)

    const decorators = createDecorator([
        {
            component: Image,
            strategy: findEntitiesOf("image")
        }
    ])

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorators))

    const queryClient = useQueryClient()

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: (body) => NewsService.postNews(body),
        onSuccess: async () => {
            setIsInvalidate(true)
            await queryClient.invalidateQueries({ queryKey: ["newsLimit"], refetchInactive: true })
            setIsInvalidate(false)
            setOpenSuccess(true)
        },
        onError: () => setOpenError(true)
    })

    const ref = useRef(null)

    const publication = async () => {
        const content = ref.current?.editorContainer.firstElementChild.innerHTML
        console.log(convertToRaw(editorState.getCurrentContent()))
        await mutateAsync({
            ...formState, 
            newsContent: content, 
            titleForSearch: formState.title.toLowerCase(),
            settings: convertToRaw(editorState.getCurrentContent())
        })
        setFormState(defaultValue)
        
        const emptyEditoreState = EditorState.createEmpty(decorators)
        ref.current?.update(emptyEditoreState)
    }

    return (
        <>
        <SnackBar text={"Новость успешно опубликована"} open={openSuccess} setOpen={setOpenSuccess} severity={"success"} />
        <SnackBar text={"Ошибка публикации"} open={openError} setOpen={setOpenError} severity={"error"} />
        <div className='wrapper'> 
            <div className={styles.box}>
                <h1 className={styles.title}>Опубликуйте свою новость</h1>
                <Form formState={formState} setFormState={setFormState} />
                <TextEditor editorState={editorState} setEditorState={setEditorState} ref={ref} />
                <button onClick={publication} className={styles.button}>Опубликовать новость</button>
                {
                    (isLoading || isInvalidate) && <Loader text={"Публикация новости"} />
                }
            </div>
        </div>
        </>
    )
}

export default CreateNews