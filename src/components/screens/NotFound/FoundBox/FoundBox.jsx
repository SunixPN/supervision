import styles from "./FoundBox.module.scss"
import { Link } from 'react-router-dom';

const FoundBox = () => {
    return (
        <div className={styles.box}>
            <div className="wrapper">
                <div className={styles.content}>
                    <img className={styles.image} src="/images/other/error.png" alt="" />
                    <h2 className={styles.title}>УПС</h2>
                    <p className={styles.paragraph}>Ошибка 404. Страница не найдена</p>
                    <Link className={styles.link} to={"/"}>На главную</Link>
                </div>
            </div>
        </div>
    )
}

export default FoundBox