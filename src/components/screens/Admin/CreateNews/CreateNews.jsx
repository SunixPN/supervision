import TextEditor from './TextEditor/TextEditor';
import Form from './Form/Form';
import { useState, useRef } from 'react';
import styles from "./CreateNews.module.scss"
import { useMutation } from 'react-query';
import { NewsService } from '../../../../services/NewsService';
import Loader from '../../../ui/Loader/Loader';
import SnackBar from './TextEditor/ControllerList/SnackBar/SnackBar';

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

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: (body) => NewsService.postNews(body),
        onSuccess: () => setOpenSuccess(true),
        onError: () => setOpenError(true)
    })

    const ref = useRef(null)

    const publication = async () => {
        const content = ref.current?.editorContainer.firstElementChild.innerHTML
        await mutateAsync({...formState, newsContent: content})
        setFormState(defaultValue)
    }

    return (
        <>
        <SnackBar text={"Новость успешно опубликована"} open={openSuccess} setOpen={setOpenSuccess} severity={"success"} />
        <SnackBar text={"Ошибка публикации"} open={openError} setOpen={setOpenError} severity={"error"} />
        <div className='wrapper'> 
            <div className={styles.box}>
                <h1 className={styles.title}>Опубликуйте свою новость</h1>
                <Form formState={formState} setFormState={setFormState} />
                <TextEditor ref={ref} />
                <button onClick={publication} className={styles.button}>Опубликовать новость</button>
                {
                    isLoading && <Loader text={"Публикация новости"} />
                }
            </div>
        </div>
        </>

    )
}

export default CreateNews