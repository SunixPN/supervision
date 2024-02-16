import { Alert, Snackbar } from "@mui/material"
import styles from "./SnackBar.module.scss"

const SnackBar = ({ text, open, setOpen, severity }) => {
    return (
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={open} autoHideDuration={5000} onClose={() => setOpen(false)}>
            <Alert className={styles.alert} onClose={() => setOpen(false)} severity={severity}>{text}</Alert>
        </Snackbar>
    )
}

export default SnackBar