import styles from "./Main.module.scss"
import Test from "./Test/Test"

const Main = ({ tests }) => {
    return (
        <section className={styles.main}>
            <div className="wrapper">
                <div className={styles.content}>
                    <h2 className={styles.title}>Все тесты на платформе</h2>
                    <div className={tests.length > 1 ? styles.box : styles.boxOne}>
                        {
                            tests.map(test => <Test key={test.id} test={test} />)
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main