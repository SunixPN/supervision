import Card from "./Card/Card"
import styles from "./Popular.module.scss"
import { useSelector } from 'react-redux';

const Popular = () => {
    const popular = useSelector(state => state.popular)
    
    return (
        <section className={styles.popular}>
            <div className="wrapper">
                <div className={styles.content}>
                    <Card newspaper={popular[0]} news={popular} />
                </div>
            </div>
            <div className={styles.container}></div>
        </section>
    )
}

export default Popular