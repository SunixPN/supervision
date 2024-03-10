import { useState } from "react"

export const useValidate = () => {
    const value = {
        categoryName: false,
        title: false,
        titleImageUrl: false
    } 

    const [validate, setValidate] = useState(value)

    const validateFn = (formState) => {
        const validateObject = {...value}

        Object.keys(formState).forEach(key => {
            if (formState[key] === "" && key !== "subTitle") {
                validateObject[key] = true
            }

            else if (validate[key] && key !== "subTitle") {
                validateObject[key] = false
            }
        })

        setValidate(validateObject)
        return validateObject
    }

    return { validate, validateFn, setValidate }
}