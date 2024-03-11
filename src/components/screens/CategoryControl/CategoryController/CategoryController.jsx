import styles from "./CategoryController.module.scss"
import Input from './../../../ui/Input/Input';
import { useEffect, useState } from "react";
import Error from './../../Admin/CreateNews/Form/Error/Error';
import { useMutation, useQueryClient } from "react-query";
import { CategoryService } from "../../../../services/CategoryService";
import Loader from "../../../ui/Loader/Loader";
import SnackBar from './../../Admin/CreateNews/TextEditor/ControllerList/SnackBar/SnackBar';

const CategoryController = () => {
    const [value, setValue] = useState("")
    const [error, setError] = useState(false)
    const [width, setWidth] = useState(window.innerWidth <= 425 ? "250px" :  "300px" )
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openError, setOpenError] = useState(false)
    const [isInvalidate, setIsInvalidate] = useState(false)

    const queryClient = useQueryClient()

    const { mutateAsync, isLoading } = useMutation({
        mutationKey: ["putCategory"],
        mutationFn: (body) => CategoryService.postCategory(body),
        onSuccess: async () => {
            setIsInvalidate(true)
            await queryClient.invalidateQueries({ queryKey: ["category"], refetchActive: true })
            setIsInvalidate(false)
            setValue("")
            setOpenSuccess(true)

        },
        onError: () => setOpenError(true)
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (value === "") {
            setError(true)
        }

        else {
            await mutateAsync({ categoryName: value })
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
        <>
        <SnackBar open={openSuccess} setOpen={setOpenSuccess} severity={"success"} text={"Категория успешно добавлена"} />
        <SnackBar open={openError} setOpen={setOpenError} severity={"error"} text={"Ошибка добавления категории"} />
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
        {
            (isLoading || isInvalidate) && <Loader pageLoading={false} text={"Добавяем категорию"} />
        }
        </>
    )
}

export default CategoryController