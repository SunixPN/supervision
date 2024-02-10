import styles from "./Recomend.module.scss"
import { Link } from 'react-router-dom';

const Recomend = ({ news }) => {
    return (
        <div className={styles.recomend}>
            <h3 className={styles.title}>{news.title}</h3>
            <p className={styles.paragraph}>{news.sub}</p>
            <Link to={news.link} className={styles.link}></Link>
        </div>
    )
}

export default Recomend