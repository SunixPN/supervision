import styles from "./ControllContent.module.scss"
import Test from "./Test/Test"

const ControllContent = ({ tests }) => {
    return (
        <section className={styles.main}>
            <div className="wrapper">
                <div className={styles.content}>
                    {
                        tests.length === 0
                        ?
                        <div className={styles.container}>
                            <img className={styles.image} src="/images/svg/empty.svg" alt="empty" />
                            <h2 className={styles.title}>Здесь пока нету тестов</h2>
                            <p className={styles.paragrpah}>
                                Добавьте новый тест в панели управления
                            </p>
                        </div>
                        :
                        <>
                        <h2 className={styles.title}>Все тесты на платформе</h2>
                        <div className={tests.length > 1 ? styles.box : styles.boxOne}>
                            {
                                tests.map(test => <Test key={test.id} test={test} />)
                            }
                        </div>
                        </>
                    }

                </div>
            </div>
        </section>
    )
}

export default ControllContent