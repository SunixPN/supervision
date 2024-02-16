import TextEditor from './TextEditor/TextEditor';
import Form from './Form/Form';
import { useState, useRef } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../../variables/URL';

const CreateNews = () => {
    const [formState, setFormState] = useState({
        categoryName: "",
        title: "",
        subTitle: "",
        titleImageUrl: ""
    })

    const ref = useRef(null)

    const [html, setHtml] = useState()

    return (
        <>
            <div dangerouslySetInnerHTML={{__html: html}}></div>
            <Form formState={formState} setFormState={setFormState} />
            <TextEditor ref={ref} />
            <button onClick={async () => {
                const response = await axios.post(`${BASE_URL}/news`, {...formState, newsContent:  ref.current?.editorContainer.firstElementChild.innerHTML})
                console.log(response.data)
            }}>ОТПРАВИТЬ</button>
            <button onClick={async () => {
                const response = await axios.get(`${BASE_URL}/news`)
                setHtml(response.data[0].newsContent)
            }}>ПОЛУЧИТЬ</button>
        </>
    )
}

export default CreateNews