import { memo, useCallback, useState } from "react"
import { useMutation } from 'react-query';
import { BASE_URL } from './../../../../../variables/URL';
import axios from 'axios';
import Loader from "../../../../ui/Loader/Loader";
import SnackBar from "../TextEditor/ControllerList/SnackBar/SnackBar";
import SideBar from "./SideBar/SideBar";

const Form = memo(({ formState, setFormState }) => {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openError, setOpenError] = useState(false)
    const [errorText, setErrorText] = useState("Ошибка загрузки")

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: (body) => axios.post(`${BASE_URL}/test-upload`, body),
        onError: () => {
            setErrorText("Ошибка загрузки")
            setOpenError(true)
        }, 
        onSuccess: () => setOpenSuccess(true)
    })

    const handleFileLoad = useCallback(async (event) => {
        const fileSize = (event.target.files[0].size) / 1048576

        if (fileSize > 1.5) {
            event.target.value = null
            setErrorText(`Файл слишком велик (${fileSize.toFixed(2)} мб)`)
            setOpenError(true)
        }

        else {
            const formData = new FormData()
            const file = event.target.files[0]
    
            event.target.value = null
    
            formData.append("image", file)
    
            const { data } = await mutateAsync(formData)
    
            setFormState({...formState, titleImageUrl: data.imageName})
        }
    }, [formState, mutateAsync])



    return (
        <>
        <SnackBar text={"Изображение успешно загружено"} open={openSuccess} setOpen={setOpenSuccess} severity={"success"} />
        <SnackBar text={errorText} open={openError} setOpen={setOpenError} severity={"error"} />
        <SideBar handleFileLoad={handleFileLoad} formState={formState} setFormState={setFormState} />
        { isLoading && <Loader text={"Загрузка изображения"} /> }
        </>
    )
})

export default Form