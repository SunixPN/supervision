import axios from "axios"
import Controller from "./Controller/Controller"
import styles from "./ControllerList.module.scss"
import { addImage } from "contenido"
import { useMutation } from "react-query";
import SnackBar from "./SnackBar/SnackBar";
import { useEffect, useRef, useState } from "react";
import { BASE_URL } from './../../../../../../variables/URL';
import { types } from './../../../../../../data/types';
import { blocks } from './../../../../../../data/blocks';
import Loader from './../../../../../ui/Loader/Loader';

const ControllerList = ({ editorState, setEditorState }) => {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openError, setOpenError] = useState(false)
    const [errorText, setErrorText] = useState("Ошибка загрузки")
    const [select, setSelect] = useState(window.innerWidth <= 600 ? true : false)
    const [styleDropActive, setStyleDropActive] = useState(false)
    const [blockDropActive, setBlockDropActive] = useState(false)
    const styleRef = useRef(null)
    const blockRef = useRef(null)

    useEffect(() => {
        const handleResize = () => { 
            window.innerWidth <= 600 ? setSelect(true) : setSelect(false) 
        }

        const handleClick = (event) => {
            !styleRef.current.contains(event.target) && setStyleDropActive(false)
            !blockRef.current.contains(event.target) && setBlockDropActive(false)
        }

        window.addEventListener("resize", handleResize)
        window.addEventListener("click", handleClick)
        window.addEventListener("keydown", handleClick)

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("click", handleClick)
            window.removeEventListener("keydown", handleClick)
        }
    }, [])

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: (body) => axios.post(`${BASE_URL}/test-upload`, body),
        onError: () => {
            setErrorText("Ошибка загрузки")
            setOpenError(true)
        }, 
        onSuccess: () => setOpenSuccess(true)
    })

    const handleAddImage = async (event) => {
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
    
            const imageProps = {
                src: data.imageName,
                alt: "image"
            }
    
            addImage(editorState, setEditorState, imageProps)
        }
    }

    const handleStyleClick = (event) => {
        event.preventDefault()
        setStyleDropActive(prev => !prev)
    }

    const handleBlockClick = (event) => {
        event.preventDefault()
        setBlockDropActive(prev => !prev)
    }

    return (
        <>
        <SnackBar text={"Изображение успешно загружено"} open={openSuccess} setOpen={setOpenSuccess} severity={"success"} />
        <SnackBar text={errorText} open={openError} setOpen={setOpenError} severity={"error"} />
        <div className={styles.list}>
            <div ref={styleRef} className={styles.box}>
                {
                    select ?
                    <>
                    <button onMouseDown={handleStyleClick} className={styles.down}>Стили</button>
                    <div className={[styles.drop, styleDropActive ? "" : styles.hidden].join(" ")}>
                        {
                            types.map(type => 
                            <Controller key={type.id} editorState={editorState} setEditorState={setEditorState} type={type.style}>
                                { type.style }
                            </Controller>)
                        }
                    </div>
                    </>
                    :
                    types.map(type => 
                    <Controller key={type.id} editorState={editorState} setEditorState={setEditorState} type={type.style}>
                        { type.style }
                    </Controller>)
                }
            </div>
            <div ref={blockRef}  className={styles.box}>
                {
                    select ?
                    <>
                    <button onMouseDown={handleBlockClick} className={styles.down}>Блоки</button>
                    <div className={[styles.drop, blockDropActive ? "" : styles.hidden].join(" ")}>
                        {
                            blocks.map(block => 
                                <Controller key={block.id} editorState={editorState} setEditorState={setEditorState} block={block.style}>
                                    { block.title }
                                </Controller>)
                        }
                    </div>
                    </>
                    :
                    blocks.map(block => 
                        <Controller key={block.id} editorState={editorState} setEditorState={setEditorState} block={block.style}>
                            { block.title }
                        </Controller>)    
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