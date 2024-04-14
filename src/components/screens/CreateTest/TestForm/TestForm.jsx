import styles from "./TestForm.module.scss"
import Input from './../../../ui/Input/Input';
import { useState } from "react";
import QuestionForm from "./QuestionForm/QuestionForm";
import { useMutation, useQueryClient } from "react-query";
import { TestService } from "../../../../services/TestSerice";
import Loader from './../../../ui/Loader/Loader';
import SnackBar from './../../Admin/CreateNews/TextEditor/ControllerList/SnackBar/SnackBar';

const TestForm = () => {
    const [testContent, setTestContent] = useState([])
    const [testTitle, setTestTitle] = useState("")
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openError, setOpenError] = useState(false)
    const [isInvalidate, setIsInvalidate] = useState(false)

    const queryClient = useQueryClient()

    const { mutateAsync, isLoading } = useMutation({
        mutationKey: ["postTest"],
        mutationFn: (body) => TestService.postTest(body),
        onSuccess: async () => {
            setIsInvalidate(true)
            await queryClient.invalidateQueries({ queryKey: ["tests"], refetchInactive: true })
            setIsInvalidate(false)
            setOpenSuccess(true)
            setTestContent([])
            setTestTitle("")
        },
        onError: () => {
            setOpenError(true)
        }
    })

    const handleClick = (event) => {
        event.preventDefault()

        setTestContent([...testContent,
            {
                id: testContent.length + 1,
                title: "",
                question: "",
                answers: [
                ]
            }, 
        ])
    }

    const handleChangeTestContent = (newTets) => {
        setTestContent([...testContent.map(test => test.id === newTets.id ? newTets : test)])
    }

    const handleDeleteQuestion = (id) => (event) => {
        event.preventDefault()
        setTestContent([...testContent.filter(test => test.id !== id)].map((test, index) => ({...test, id: index + 1})))
    }

    const handleSubmitTest = async () => {
        await mutateAsync({ testContent, title: testTitle, titleForSearch: "", settings: "" })
    }

    return (
        <>
        <SnackBar open={openSuccess} setOpen={setOpenSuccess} severity={"success"} text={"Тест успешно опубликован"} />
        <SnackBar open={openError} setOpen={setOpenError} severity={"error"} text={"Ошибка публикации"} />
        {
            (isLoading || isInvalidate) && <Loader pageLoading={false} text={"Публикуем ваш тест"} />
        }
        <section className={styles.testForm}>
            <div className="wrapper">
                <div className={styles.formContent}>
                    <div className={styles.titleBox}>
                        <h1 className={styles.tilte}>Создание теста</h1>
                        <button onClick={handleSubmitTest} className={styles.submit}>Опубликовать тест!</button>
                    </div>
                    <form className={styles.form}>
                        <div className={styles.inputBox}>
                            <label className={styles.label} htmlFor="testName">Название</label>
                            <Input value={testTitle} onChange={(event) => setTestTitle(event.target.value)} style={{ maxWidth: "400px" }} id={"testName"} />
                        </div>
                        <div className={styles.box}>
                            <h2 className={styles.titleQuestions}>Вопросы для теста</h2>
                            <button onClick={handleClick} className={styles.button}>Новый вопрос</button>
                        </div>
                        <div className={styles.qestions}>
                            {
                                testContent.length === 0
                                ?
                                <p className={styles.empty}>Добавьте вопросы для вашего теста!</p>
                                :
                                testContent.map(test => <QuestionForm
                                    key={test.id} 
                                    question={test} 
                                    handleChangeTestContent={handleChangeTestContent} 
                                    handleDeleteQuestion={handleDeleteQuestion} 
                                />)
                            }
                        </div>
                    </form>
                </div>
            </div>
        </section>
        </>
    )
}

export default TestForm