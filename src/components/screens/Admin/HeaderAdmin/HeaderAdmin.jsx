import styles from "./HeaderAdmin.module.scss"
import Down from './../../../../layouts/Header/Down/Down';
import UpAdmin from "./UpAdmin/UpAdmin";
import NavigateAdmin from "./NavigateAdmin/NavigateAdmin";

const HeaderAdmin = () => {
    return (
        <header className={styles.header}>
            <div className="wrapper">
                <div className={styles.content}>
                    <UpAdmin />
                    <Down />
                </div>
            </div>
            <NavigateAdmin />
        </header>
    )
}

export default HeaderAdmin