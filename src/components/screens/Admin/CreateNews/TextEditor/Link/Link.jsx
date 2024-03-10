import styles from "./Link.module.scss"

const Link = ({ href, title }) => {
    return (
        <a
        className={styles.link} 
        href={href} 
        target="_blank"
        >
            { title }
        </a>
    )
}

export default Link