import { memo, useState } from "react"
import styles from "./Form.module.scss"
import { useMutation } from 'react-query';
import { BASE_URL } from './../../../../../variables/URL';
import axios from 'axios';
import Loader from "../../../../ui/Loader/Loader";
import SnackBar from "../TextEditor/ControllerList/SnackBar/SnackBar";

const Form = memo(({ formState, setFormState }) => {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openError, setOpenError] = useState(false)

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: (body) => axios.post(`${BASE_URL}/test-upload`, body),
        onError: () => setOpenError(true),
        onSuccess: () => setOpenSuccess(true)
    })

    const handleFileLoad = async (event) => {
        const formData = new FormData()
        const file = event.target.files[0]

        formData.append("image", file)

        const { data } = await mutateAsync(formData)

        setFormState({...formState, titleImageUrl: data.imageName})
    }

    return (
        <>
        <SnackBar text={"Картинка успешно загружена"} open={openSuccess} setOpen={setOpenSuccess} severity={"success"} />
        <SnackBar text={"Ошибка загрузки"} open={openError} setOpen={setOpenError} severity={"error"} />
        <form className={styles.form}>
            <select onChange={(event) => setFormState({...formState, categoryName: event.target.value})} name="">
                <option value="КАТЕГОРИЯ 1">КАТЕГОРИЯ 1</option>
                <option value="КАТЕГОРИЯ 2">КАТЕГОРИЯ 2</option>
                <option value="КАТЕГОРИЯ 3">КАТЕГОРИЯ 3</option>
            </select>
            <input value={formState.title} onChange={(event) => setFormState({...formState, title: event.target.value})} type="text" />
            <input value={formState.subTitle} onChange={(event) => setFormState({...formState, subTitle: event.target.value})} type="text" />
            <input type="file" onChange={handleFileLoad} />
            { isLoading && <Loader /> }
        </form>
        </>
    )
})

export default Form