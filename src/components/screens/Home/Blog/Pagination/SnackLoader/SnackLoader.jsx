import { Alert, Snackbar } from "@mui/material"
import LoaderForm from "../../../../../ui/LoaderForm/LoaderForm"
import styles from "./SnackLoader.module.scss"

const SnackLoader = ({ open }) => {
    return (
        <Snackbar anchorOrigin={ { horizontal: "right", vertical: "top" } } open={open}>
            <Alert severity="info">
                <div className={styles.box}>
                    <p className={styles.loading}>Загрузка</p>
                    <LoaderForm />
                </div>
            </Alert>
        </Snackbar>
    )
}

export default SnackLoader