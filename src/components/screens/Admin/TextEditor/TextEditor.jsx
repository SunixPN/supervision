import { Editor, EditorState, Modifier, RichUtils, getDefaultKeyBinding } from "draft-js"
import { createDecorator, findEntitiesOf } from "contenido"
import { useRef, useState } from "react"
import "draft-js/dist/Draft.css"
import Image from "./Image/Image"
import ControllerList from "./ControllerList/ControllerList"
import axios from "axios"

const TextEditor = () => {
    const ref = useRef(null)

    const keyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)

        newState && setEditorState(newState)
    }

    const decorators = createDecorator([
        {
            component: Image,
            strategy: findEntitiesOf("image")
        }
    ])

    const [html, setHtml] = useState("")


    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorators))

    const handleTab = (event) => {
        if (event.keyCode === 9) {
            event.preventDefault()

            const newContent = Modifier.insertText(
                editorState.getCurrentContent(),
                editorState.getSelection(),
                "\t"
            )

            setEditorState(EditorState.push(editorState, newContent, "insert-characters"))
        }

        else {
            return getDefaultKeyBinding(event)
        }

    }
    return (
        <div className="wrapper">
            <div dangerouslySetInnerHTML={{__html: html}}></div>
            <button onClick={async () => {
                console.log(1)
                await axios.post("https://supervisionback.onrender.com/news", {
                    newsContent: ref.current.editorContainer.firstElementChild.innerHTML,
                    categoryName: "name"
                })
            }}>ОТПРАВИТЬ</button>
                        <button onClick={async () => {
                console.log(1)
                const response = await axios.get("https://supervisionback.onrender.com/news")
                setHtml(response.data[0].newsContent)
            }}>ПОЛУЧИТЬ</button>
            <ControllerList editorState={editorState} setEditorState={setEditorState} />
            <Editor placeholder="Здесь вы можете писать свою новость..." ref={ref} keyBindingFn={handleTab} handleKeyCommand={keyCommand} editorState={editorState} onChange={setEditorState} />
        </div>
    )
}

export default TextEditor