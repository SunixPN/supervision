import { useQuery } from "react-query"
import Footer from "../../../layouts/Footer/Footer"
import HeaderAdmin from "../Admin/HeaderAdmin/HeaderAdmin"
import { AuthService } from "../../../services/AuthService"
import Loader from "../../ui/Loader/Loader"
import { useEffect } from "react"
import { useActions } from "../../../hooks/useActions"
import { useSelector } from "react-redux"
import Settings from "./Settings/Settings"

const Account = () => {
    const { data: acc, isLoading: loadAcc } = useQuery({
        queryKey: ["account"],
        queryFn: AuthService.getAccount
    })

    const { setAccountData } = useActions()
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        if (acc) {
            setAccountData(acc.accInfo[0])
        }
    }, [acc])

    return (
        <>
        {
            (loadAcc || Object.keys(auth.accountData).length === 0) ? <Loader pageLoading={true} text={"Загрзка данных об аккаунте"} />
            :
            <>
            <HeaderAdmin />
            <Settings />
            <Footer />
            </>
        }
        </>

    )
}

export default Account