import { useEffect, useRef, useState } from "react"
import TextEditor from "../../Admin/CreateNews/TextEditor/TextEditor"
import { EditorState, convertFromRaw } from "draft-js"
import { createDecorator, findEntitiesOf } from "contenido"
import Image from "../../Admin/CreateNews/TextEditor/Image/Image"
import { useParams } from "react-router-dom"
import styles from "./Editor.module.scss"
import Form from "../../Admin/CreateNews/Form/Form"

const Editor = ({ news }) => {
    const ref = useRef(null)
    const { id } = useParams() 
    const newsPaper = news.find(newsPaper => newsPaper.newsId === id)
    
    const defaultState = {
        categoryName: newsPaper.categoryName,
        title: newsPaper.title,
        subTitle: newsPaper.subTitle,
        titleImageUrl: newsPaper.titleImageUrl
    }

    const [formState, setFormState] = useState(defaultState)

    const decorators = createDecorator([
        {
            component: Image,
            strategy: findEntitiesOf("image")
        }
    ])

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorators))

    useEffect(() => {
        if (ref.current) {
            ref.current.update(EditorState.push(editorState, convertFromRaw(newsPaper.settings)))
        }
    }, [ref])

    return (
        <>
        <section className={styles.section}>
            <div className="wrapper">
                <div className={styles.content}>
                    <Form formState={formState} setFormState={setFormState} />
                    <h1 className={styles.title}>Редактирование новости "{newsPaper.title}"</h1>
                    <TextEditor editorState={editorState} setEditorState={setEditorState} ref={ref} />
                </div>
            </div>
        </section>

        </>
    )
}

export default Editor