import { memo, useState } from "react"
import styles from "./Form.module.scss"
import { useMutation } from 'react-query';
import { BASE_URL } from './../../../../../variables/URL';
import axios from 'axios';
import Loader from "../../../../ui/Loader/Loader";
import SnackBar from "../TextEditor/ControllerList/SnackBar/SnackBar";
import Input from "../../../../ui/Input/Input";
import Select from "react-select"
import { useSelector } from "react-redux";

const Form = memo(({ formState, setFormState }) => {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openError, setOpenError] = useState(false)
    const [errorText, setErrorText] = useState("Ошибка загрузки")
    const [sideBarActive, setSideBarActive] = useState(false)

    const sideClasses = [styles.sideBar, sideBarActive ? styles.sideActive : ""]
    const buttonClasses = [styles.button, sideBarActive ? styles.activeButton : ""]

    const category = useSelector(state => state.category)
    const options = category.map(cat => { return { value: cat.categoryName, label: cat.categoryName } })

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: (body) => axios.post(`${BASE_URL}/test-upload`, body),
        onError: () => {
            setErrorText("Ошибка загрузки")
            setOpenError(true)
        }, 
        onSuccess: () => setOpenSuccess(true)
    })

    const handleFileLoad = async (event) => {
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
    }

    const getValue = () => {
        return formState.categoryName ? options.find(opt => opt.value === formState.categoryName) : ""
    }

    const handleChangeCategory = (newValue) => {
        setFormState({ ...formState, categoryName: newValue.value })
    }

    return (
        <>
        <SnackBar text={"Изображение успешно загружено"} open={openSuccess} setOpen={setOpenSuccess} severity={"success"} />
        <SnackBar text={errorText} open={openError} setOpen={setOpenError} severity={"error"} />
        <aside className={sideClasses.join(" ")}>
            <button onClick={() => setSideBarActive(prev => !prev)} className={buttonClasses.join(" ")}></button>
            <h2 className={styles.title}>Обложка</h2>
            <form className={styles.form}>
                <Select onChange={handleChangeCategory} value={getValue()} options={options}></Select>
                <Input placeholder="Заголовок новости" value={formState.title} onChange={(event) => setFormState({...formState, title: event.target.value})} type="text" />
                <textarea placeholder="Подзаголовок новости" className={styles.area} value={formState.subTitle} onChange={(event) => setFormState({...formState, subTitle: event.target.value})}></textarea>
                {
                    formState.titleImageUrl ?
                    <>
                    <div className={styles.files}>
                        <label className={styles.label} htmlFor="IMAGE">
                            <input id="IMAGE" className={styles.file} type="file" onChange={handleFileLoad} />
                        </label>
                        <p className={styles.paragraph}>Превью изображения</p>
                    </div>
                    <img className={styles.image} src={formState.titleImageUrl} alt="image" />
                    </> 
                    :
                    <div className={styles.files}>
                        <label className={styles.label} htmlFor="IMAGE">
                            <input id="IMAGE" className={styles.file} type="file" onChange={handleFileLoad} />
                        </label>
                    <p className={styles.paragraph}>Выбрать изображение для обложки</p>
                    </div>
                }
            </form>
        </aside>
        { isLoading && <Loader text={"Загрузка изображения"} /> }
        </>
    )
})

export default Form