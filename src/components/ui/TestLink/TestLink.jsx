import { Tooltip } from "@mui/material"
import styles from "./TestLink.module.scss"
import { useNavigate } from "react-router-dom"

const TestLink = ({ isAdmin = false }) => {
    const navigate = useNavigate()

    return (
        <Tooltip title={!isAdmin ? "Перейти к тестам" : "Создание теста"} >
            <button onClick={() => !isAdmin ? navigate("/tests") : navigate("/admin/createTest")} className={styles.link} />
        </Tooltip>

    )
}

export default TestLink