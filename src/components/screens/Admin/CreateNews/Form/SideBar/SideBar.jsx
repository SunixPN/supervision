import { memo, useState } from "react"
import styles from "./SideBar.module.scss"
import Select from "react-select"
import { useSelector } from "react-redux";
import Input from './../../../../../ui/Input/Input';

const SideBar = memo(({ handleFileLoad, formState, setFormState }) => {
    const category = useSelector(state => state.category)

    const options = category.map(cat => { return { value: cat.categoryName, label: cat.categoryName } })

    const [sideBarActive, setSideBarActive] = useState(false)

    const sideClasses = [styles.sideBar, sideBarActive ? styles.sideActive : ""]
    const buttonClasses = [styles.button, sideBarActive ? styles.activeButton : ""]

    const getValue = () => {
        return formState.categoryName ? options.find(opt => opt.value === formState.categoryName) : ""
    }

    const handleChangeCategory = (newValue) => {
        setFormState({ ...formState, categoryName: newValue.value })
    }

    return (
        <div className={sideClasses.join(" ")}>
        <button onClick={() => setSideBarActive(prev => !prev)} className={buttonClasses.join(" ")}></button>
        <aside className={styles.container}>
            <h2 className={styles.title}>Обложка</h2>
            <form className={styles.form}>
                <Select placeholder="Выбрать категорию" onChange={handleChangeCategory} value={getValue()} options={options}></Select>
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
        </div>
    )
})

export default SideBar