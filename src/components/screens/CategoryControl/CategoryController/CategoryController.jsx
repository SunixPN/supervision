import styles from "./CategoryController.module.scss"
import Input from './../../../ui/Input/Input';
import { useEffect, useState } from "react";
import Error from './../../Admin/CreateNews/Form/Error/Error';

const CategoryController = () => {
    const [value, setValue] = useState("")
    const [error, setError] = useState(false)
    const [width, setWidth] = useState(window.innerWidth <= 425 ? "250px" :  "300px" )

    const handleSubmit = (event) => {
        event.preventDefault()
        if (value === "") {
            setError(true)
        }

        else {
            console.log('Submit')
            setValue("")
        }
    }

    const handleChange = (event) => {
        if (event.target.value !== "") {
            setError(false)
        }
        setValue(event.target.value)
    } 

    useEffect(() => {
        window.scrollTo(0, 0)

        const handleResize = () => {
            if (window.innerWidth <= 425) {
                setWidth("250px")
            }

            else {
                setWidth("300px")
            }
        }

        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <section className={styles.category}>
            <div className="wrapper">
                <div className={styles.content}>
                    <h2 className={styles.title}>Добавить категорию</h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.wrapper}>
                            {
                                error && <Error message={"обязательное поле!"} />
                            }
                            <Input
                            value={value}
                            onChange={handleChange} 
                            placeholder={"Название категории"} 
                            style={{ width: width}} 
                            />
                        </div>
                        <button className={styles.button}>Добавить категорию</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default CategoryController