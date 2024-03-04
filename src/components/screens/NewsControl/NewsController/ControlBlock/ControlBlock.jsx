import styles from "./ControlBlock.module.scss"
import Block from "../../../Home/Blog/Block/Block"
import ModalWindow from "../../../../ui/ModalWindow/ModalWindow"
import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { NewsService } from "../../../../../services/NewsService"
import Loader from '../../../../ui/Loader/Loader';
import SnackBar from "../../../Admin/CreateNews/TextEditor/ControllerList/SnackBar/SnackBar"

const ControlBlock = ({ newsPaper }) => {
    const [activeModal, setActiveModal] = useState(false)
    const [isInvalidate, setIsInvalidate] = useState(false)
    const [openError, setOpenError] = useState(false)

    const queryClient = useQueryClient() 

    const { mutateAsync, isLoading } = useMutation({
        mutationKey: ["newsDelete", newsPaper.newsId],
        mutationFn: (body) => NewsService.deleteNews(body),
        onSuccess: async () => {
            setIsInvalidate(true)
            await queryClient.invalidateQueries({ queryKey: ["newsLimit"] })
            setIsInvalidate(false)
        },
        onError: () => setOpenError(true)
    })

    const handleDeleteNews = async () => {
        setActiveModal(false)
        await mutateAsync({ newsId: newsPaper.newsId })
    }

    return (
        <>
        <SnackBar open={openError} setOpen={setOpenError} severity={"error"} text={"Ошибка удаления"} />
        <div className={styles.container}>
            <Block news={newsPaper} controllers={true} setActiveModal={setActiveModal} />
        </div> 
        <ModalWindow active={activeModal} setActive={setActiveModal}>
                <h2 className={styles.titleModal}>Подтверждение</h2>
                <div className={styles.modalBox}>
                    <h3 className={styles.boxTitle}>Вы действительно хотите удалить новость <br></br>"{newsPaper.title}" ?</h3>
                    <p className={styles.boxParagraph}>После удаления, новость восстановлению не подлежит ...</p>
                </div>
                <div className={styles.buttons}>
                    <button onClick={handleDeleteNews} className={[styles.buttonModal, styles.yes].join(" ")}>Да</button>
                    <button onClick={() => setActiveModal(false)} className={[styles.buttonModal, styles.no].join(" ")}>Отмена</button>
                </div>
        </ModalWindow>
        {
            isInvalidate || isLoading && <Loader text={"Удаление новости"} pageLoading={false} />
        }  
        </>
    )
}

export default ControlBlock