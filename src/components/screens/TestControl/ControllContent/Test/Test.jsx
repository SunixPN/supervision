import { useNavigate } from "react-router-dom"
import styles from "./Test.module.scss"
import { useState } from "react"
import ModalWindow from "../../../../ui/ModalWindow/ModalWindow"
import { useMutation, useQueryClient } from "react-query"
import { TestService } from "../../../../../services/TestSerice"
import Loader from "../../../../ui/Loader/Loader"
import SnackBar from "../../../Admin/CreateNews/TextEditor/ControllerList/SnackBar/SnackBar"

const Test = ({ test }) => {
    const navigate = useNavigate()
    const [activeModal, setActiveModal] = useState(false)
    const [openError, setOpenError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const queryClient = useQueryClient()
    
    const { mutateAsync, isLoading: loadDelete } = useMutation({
        mutationKey: ["deleteTest"],
        mutationFn: (id) => TestService.deleteTest(id),
        onSuccess: async () => {
            setIsLoading(true)
            await queryClient.invalidateQueries({ queryKey: ["tests"], refetchInactive: true })
            setIsLoading(false)
        },
        onError: () => setOpenError(true)
    })

    const handleDeleteTest = async () => {
        await mutateAsync(test.testId)
    }

    return (
        <>
        <SnackBar open={openError} setOpen={setOpenError} severity={"error"} text={"Ошибка удаления теста"} />
        {
            (isLoading || loadDelete) && <Loader pageLoading={false} text={"Удаление теста"} />
        }
        <ModalWindow active={activeModal} setActive={setActiveModal}>
            <h2 className={styles.titleModal}>Подтверждение</h2>
            <div className={styles.modalBox}>
                <h3 className={styles.boxTitle}>Вы действительно хотите удалить тест <br></br>"{test.title}" ?</h3>
                <p className={styles.boxParagraph}>После удаления, тест восстановлению не подлежит ...</p>
            </div>
            <div className={styles.buttons}>
                <button onClick={handleDeleteTest} className={[styles.buttonModal, styles.yes].join(" ")}>Да</button>
                <button onClick={() => setActiveModal(false)} className={[styles.buttonModal, styles.no].join(" ")}>Отмена</button>
            </div>
        </ModalWindow>
        <article className={styles.test}>
            <div className={styles.testBox}>
                <img className={styles.image} src="/images/svg/test.svg" alt="testImage" />
                <div className={styles.content}>
                    <div className={styles.labelBox}>
                        <div className={styles.box}>
                            <p className={styles.label}>Количество вопросов:</p>
                            <span className={styles.value}>{test.testContent.length}</span>
                        </div>
                        <div className={styles.box}>
                            <p className={styles.label}>Название:</p>
                            <span className={styles.value}>{test.title}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.buttonBox}>
                <button onClick={() => navigate(`/admin/testResult/${test.testId}`)} className={styles.button}>Посмотреть результаты</button>
                <button onClick={() => setActiveModal(true)} className={styles.delete}>Удалить тест</button>
            </div>
        </article>
        </>
    )
}

export default Test