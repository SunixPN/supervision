import styles from "./Image.module.scss"

const Image = ({ src, alt }) => {
    return (
        <img className={styles.image} src={src} alt={alt} />
    )
}

export default Image