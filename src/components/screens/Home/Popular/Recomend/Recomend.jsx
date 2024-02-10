import styles from "./Recomend.module.scss"
import { Link } from 'react-router-dom';

const Recomend = ({ news }) => {
    return (
        <div className={styles.recomend}>
            <h3 className={styles.title}>{news.type}</h3>
            <p className={styles.paragraph}>{news.title}</p>
            <Link to={news.link} className={styles.link}></Link>
        </div>
    )
}

export default Recomend