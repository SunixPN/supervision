import { useNavigate } from "react-router-dom"
import styles from "./Main.module.scss"
import Result from "./Result/Result"

const Main = ({ result }) => {
    const navigate = useNavigate()

    return (
        <section className={styles.results}>
            <div className="wrapper">
                <div className={styles.content}>
                    {
                        result.length === 0
                        ?
                        <div className={styles.container}>
                            <img className={styles.image} src="/images/svg/empty.svg" alt="empty" />
                            <h2 className={styles.title}>Еще нету результатов теста</h2>
                            <p className={styles.paragrpah}>
                                Позвольте пользователям пройти ваш тест, после чего результаты будут видны на этой странице
                            </p>
                            <button onClick={() => navigate("/admin/testControl")} className={styles.backEmpty}>Назад к тестам</button>
                        </div>
                        :
                        <>
                        <div className={styles.titleBox}>
                            <h2 className={styles.title}>Результаты прохождения теста</h2>
                            <button onClick={() => navigate("/admin/testControl")} className={styles.back}>Назад к тестам</button>
                        </div>
                        <div className={styles.box}>
                            {
                                result.map(r => <Result result={r} />)
                            }
                        </div>
                        </>
                    }

                </div>
            </div>
        </section>
    )
}

export default Main