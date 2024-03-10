import { memo, useEffect, useState } from "react"
import styles from "./SideBar.module.scss"
import Select from "react-select"
import { useSelector } from "react-redux";
import Input from './../../../../../ui/Input/Input';
import Error from "../Error/Error";

const SideBar = memo(({ setValidate, handleFileLoad, formState, setFormState, validate }) => {
    const category = useSelector(state => state.category)

    const options = category.map(cat => { return { value: cat.categoryName, label: cat.categoryName } })

    const [sideBarActive, setSideBarActive] = useState(false)
    const [firstRender, setFirstRender] = useState(true)

    const sideClasses = [styles.sideBar, sideBarActive ? styles.sideActive : ""]
    const buttonClasses = [styles.button, sideBarActive ? styles.activeButton : ""]

    const getValue = () => {
        return formState.categoryName ? options.find(opt => opt.value === formState.categoryName) : ""
    }

    const handleChangeCategory = (newValue) => {
        setValidate({...validate, categoryName: false})
        setFormState({ ...formState, categoryName: newValue.value })
    }

    const handleChangeTitle = (event) => {
        if (validate.title) {
            setValidate({...validate, title: event.target.value === "" ? true : false})
        }
        setFormState({...formState, title: event.target.value})
    }

    useEffect(() => {
        if (firstRender) {
            setFirstRender(false)
        }

        else {
            const isInvalid = Object.values(validate).some(value => value)
    
            if (isInvalid) {
                setSideBarActive(true)
            }
        }
    }, [validate])

    return (
        <div className={sideClasses.join(" ")}>
        <button onClick={() => setSideBarActive(prev => !prev)} className={buttonClasses.join(" ")}></button>
        <aside className={styles.container}>
            <h2 className={styles.title}>Обложка</h2>
            <form className={styles.form}>
                <div className={styles.formBox}>
                    <Select placeholder="Выбрать категорию" onChange={handleChangeCategory} value={getValue()} options={options}></Select>
                    {
                        validate.categoryName && <Error message={"Обязательное поле! Выберите категорию"} />
                    }
                </div>
                <div className={styles.formBox}>
                    <Input placeholder="Заголовок новости" value={formState.title} onChange={handleChangeTitle} type="text" />
                    {
                        validate.title && <Error message={"Обязательно поле! Введите заголовок новости"} />
                    }
                </div>
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
                        {
                            validate.titleImageUrl ? <Error message={"Обязательно поле! Выберите обложку для новости"} />
                            :
                            <p className={styles.paragraph}>Выбрать изображение для обложки</p>
                        }
                    </div>
                }
            </form>
        </aside>
        </div>
    )
})

export default SideBar