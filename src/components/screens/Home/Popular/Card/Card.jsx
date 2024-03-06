import { useEffect, useRef, useState } from "react";
import Button from "../../../../ui/Button/Button"
import Recomend from "../Recomend/Recomend";
import styles from "./Card.module.scss"
import { Link } from "react-router-dom" 


const Card = ({ newspaper, news }) => {
    const lastIndex = 5
    const startIndex = 0
    
    const categoryLinkArray = newspaper.newsUrl.split("/")
    const categoryLink = `/category/${categoryLinkArray[2]}`

    const [dropActive, setDropActive] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const handleClick = (event) => {
            if (!ref.current.contains(event.target)) {
                setDropActive(false)
            }
        }

        window.addEventListener("click", handleClick)

        return () => window.removeEventListener("click", handleClick)
    }, [])

    return (
        <article className={styles.card}>
            <div className={styles.block}>
                <img className={styles.image} src={newspaper.titleImageUrl} alt="card" />
                <Link to={categoryLink} className={styles.sub}>{newspaper.categoryName}</Link>
                <h2 className={styles.title}>{newspaper.title}</h2>
                <Button link={newspaper.newsUrl}>Читать</Button>
            </div>
            <div className={styles.recomended}>
                <div ref={ref} onClick={() => setDropActive(prev => !prev)} className={styles.dropBox}>
                    <p className={styles.paragraph}>Рекомендовано для вас</p>
                    <button className={styles.button} />
                </div>
                <div className={dropActive ? styles.recommendBox : [styles.recommendBox, styles.dropHidden].join(" ")}>
                    {
                        news.slice(startIndex, lastIndex).map(elem => <Recomend key={elem.newsId} news={elem} />)
                    }
                </div>
            </div>
        </article>
    )
}

export default Card