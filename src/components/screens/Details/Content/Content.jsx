import styles from "./Content.module.scss"

const Content = ({ newsPaper }) => {


    return (
        <div className={styles.box} dangerouslySetInnerHTML={{__html: newsPaper?.newsContent}}></div>
    )
}

export default Content