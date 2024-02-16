import axios from "axios"
import Controller from "./Controller/Controller"
import styles from "./ControllerList.module.scss"
import { addImage } from "contenido"
import { useMutation } from "react-query";
import SnackBar from "./SnackBar/SnackBar";
import { useState } from "react";
import { BASE_URL } from './../../../../../../variables/URL';
import { types } from './../../../../../../data/types';
import { blocks } from './../../../../../../data/blocks';
import Loader from './../../../../../ui/Loader/Loader';

const ControllerList = ({ editorState, setEditorState }) => {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openError, setOpenError] = useState(false)

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: (body) => axios.post(`${BASE_URL}/test-upload`, body),
        onError: () => setOpenError(true),
        onSuccess: () => setOpenSuccess(true)
    })

    const handleAddImage = async (event) => {
        const formData = new FormData()
        const file = event.target.files[0]

        formData.append("image", file)

        const { data } = await mutateAsync(formData)

        const imageProps = {
            src: data.imageName,
            alt: "image"
        }

        addImage(editorState, setEditorState, imageProps)
    }

    return (
        <>
        <SnackBar text={"Картинка успешно загружена"} open={openSuccess} setOpen={setOpenSuccess} severity={"success"} />
        <SnackBar text={"Ошибка загрузки"} open={openError} setOpen={setOpenError} severity={"error"} />
        <div className={styles.list}>
            <div className={styles.box}>
                {
                    types.map(type => 
                    <Controller key={type.id} editorState={editorState} setEditorState={setEditorState} type={type.style}>
                        { type.style }
                    </Controller>)
                }
            </div>
            <div className={styles.box}>
                {
                    blocks.map(block => 
                    <Controller key={block.id} editorState={editorState} setEditorState={setEditorState} block={block.style}>
                        { block.title }
                    </Controller>
                    )
                }
            </div>

            <label className={styles.label} htmlFor="FILE">
                <input className={styles.file} id="FILE" type="file" onChange={handleAddImage} />
            </label>
        </div>
        {
            isLoading && <Loader text={"подгрузка фотографии"} />
        }
        </>
    )
}

export default ControllerList