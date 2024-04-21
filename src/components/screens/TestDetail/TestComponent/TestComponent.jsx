import { useEffect, useState } from "react"
import Question from "./Question/Question"
import styles from "./TestComponent.module.scss"
import Radio from "../../../ui/Radio/Radio"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation } from "react-query"
import { TestService } from "../../../../services/TestSerice"
import Loader from "../../../ui/Loader/Loader"
import SnackBar from './../../Admin/CreateNews/TextEditor/ControllerList/SnackBar/SnackBar';
import ModalWindow from './../../../ui/ModalWindow/ModalWindow';
import Input from "../../../ui/Input/Input"

const TestComponent = ({ testContent }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [openError, setOpenError] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openSuccessTest, setOpenSuccessTest] = useState(false)

    const [currentQuestion, setCurrentQuestion] = useState(testContent[0])
    const [answersCount, setAnswersCount] = useState([])
    const [currentAnswers, setCurrentAnswers] = useState([])
    const [currentStatuses, setCurrentStatuses] = useState(testContent.map(test => {
        return {
            id: test.id,
            status: "Ждёт решения"
        }
    }))

    const [end, setEnd] = useState(false)
    const [results, setResults] = useState(false)
    const [active, setActive] = useState(true)
    const [name, setName] = useState("")
    const [isHandleSubmitName, setIsHandleSubmitName] = useState(false)

    const handleClick = () => {
        const correctId = currentQuestion.answers.find(answer => answer.isCorrect).id
        const currrentElem = currentAnswers.find(answer => answer.id === currentQuestion.id)

        if (!currrentElem) {
            return
        }

        const currrentId = currrentElem.answer

        setCurrentStatuses([...currentStatuses.filter(currentStatus => currentStatus.id !== currentQuestion.id), {
            id: currentQuestion.id,
            status: correctId === currrentId ? "Выполнен" : "Провален"
        }])

        testContent.length - answersCount.length !== 1
        ?
        setCurrentQuestion(prev => {
            return testContent[currentStatuses.find(current => current.id > currentQuestion.id && current.status === "Ждёт решения")?.id - 1] 
            || testContent[currentStatuses.find(current => current.status === "Ждёт решения").id - 1]
        })
        :
        setEnd(true)
        setAnswersCount([...answersCount, correctId === currrentId])

    }

    useEffect(() => {
        if (!isHandleSubmitName && !active) {
            if (!name) {
                setName("Он не ввел имя, отчислить")
                setOpenSuccess(true)
            }
            
            else {
                setOpenSuccess(true)
            }
        }

    }, [active])

    const handleSubmitName = () => {
        setIsHandleSubmitName(true)
        if (name) {
            setOpenSuccess(true)
            setActive(false)
        }

        else {
            setName("Он не ввел имя, отчислить")
            setOpenSuccess(true)
            setActive(false)
        }
    }

    const { mutateAsync, isLoading } = useMutation({
        mutationKey: ["postTest"],
        mutationFn: (body) => TestService.postTestResult(body),
        onError: () => setOpenError(true),
        onSuccess: () => {
            setOpenSuccessTest(true)
            setEnd(false)
            setResults(true)
        }
    })

    const handleSendResult = async () => {
        await mutateAsync({ testId: id, user: name, procentOfCorrectAnswers: (answersCount.filter(answer => answer).length / testContent.length) * 100 })
    }
    
    return (
        <>
        <ModalWindow none={true} disableFirstMountLogic={true} active={active} setActive={setActive}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>Введите имя</h2>
                <Input value={name} onChange={(event) => setName(event.target.value)} placeholder={"Ваше имя"} type="text" />
                <button onClick={handleSubmitName} className={styles.modalButton}>Подтвердить</button>
            </div> 
        </ModalWindow>
        <SnackBar open={openError} setOpen={setOpenError} text={"Ошибка отправки результата"} severity={"error"} />
        <SnackBar open={openSuccess} setOpen={setOpenSuccess} text={`Ваше имя: ${name}`} severity={"success"} />
        <SnackBar open={openSuccessTest} setOpen={setOpenSuccessTest} text={"Результаты успешно отправлены"} severity={"success"} />
        {
            isLoading 
            && <Loader pageLoading={false} text={"Отправка результатов"} />
        }
        <section className={styles.test}>
            <div className="wrapper">
                <div className={styles.content}>
                    <aside className={styles.sideBar}>
                        <div className={styles.boxAnswers}>
                            <p className={styles.text}>Задач решено:</p>
                            <p className={styles.count}>{`${answersCount.length}/${testContent.length}`}</p>
                        </div>
                        <h2 className={styles.title}>Список задач</h2>
                        <div className={styles.boxQuestions}>
                            {
                                testContent.map(test => 
                                <Question
                                    key={test.id} 
                                    active={currentQuestion.id === test.id} 
                                    setCurrentQuestion={setCurrentQuestion} 
                                    question={test}
                                    status={currentStatuses.find(status => status.id === test.id).status} 
                                    />)
                            }
                        </div>
                    </aside>
                    {
                        end ?
                        <div className={styles.end}>
                            <h3 className={styles.endTitle}>Поздравляем! Тест завершён</h3>
                            <p className={styles.sub}>Отправьте свои результаты!</p>
                            <button onClick={handleSendResult} className={styles.buttonEnd}>Отправить результат!</button>
                        </div>
                        :
                        results
                        ?
                        <div className={styles.end}>
                            <h3 className={styles.endTitle}>Результаты теста</h3>
                            <p className={styles.sub}>Процент правильных ответов</p>
                            <p className={styles.sub}>{ ((answersCount.filter(answer => answer).length / testContent.length) * 100)  + "%"}</p>
                            <button onClick={() => navigate("/tests")} className={styles.buttonEnd}>Перейти к тестам</button>
                        </div>
                        :
                        <div className={styles.currentQuestion}>
                            <header className={styles.header}>
                                <span className={styles.number}>{ `Задача ${currentQuestion.id}` }</span>
                                <p className={styles.questionTitle}>{ currentQuestion.title }</p>
                            </header>
                            <section className={styles.main}>
                                <h3 className={styles.mainTitle}>{ currentQuestion.question }</h3>
                                <div className={styles.answers}>
                                    {
                                        currentQuestion.answers.map(answer => <Radio currentAnswers={currentAnswers} setCurrentAnswers={setCurrentAnswers} key={answer.id} answer={answer} id={currentQuestion.id} />)
                                    }
                                </div>
                                <button onClick={handleClick} className={styles.button}>Ответить!</button>
                            </section>
                        </div>
                    }
                </div>
            </div>
        </section>
        </>
    )
}

export default TestComponent