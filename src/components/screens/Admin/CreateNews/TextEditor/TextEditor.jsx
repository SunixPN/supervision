import { Editor, EditorState, Modifier, RichUtils, getDefaultKeyBinding } from "draft-js"
import { createDecorator, findEntitiesOf } from "contenido"
import { forwardRef, useState } from "react"
import "draft-js/dist/Draft.css"
import Image from "./Image/Image"
import ControllerList from "./ControllerList/ControllerList"
import { memo } from "react"
import styles from "./TextEditor.module.scss"

const TextEditor = memo(forwardRef((__, ref) => {
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
        <>
            <ControllerList editorState={editorState} setEditorState={setEditorState} />
            <Editor placeholder="Здесь вы можете писать свою новость..." ref={ref} keyBindingFn={handleTab} handleKeyCommand={keyCommand} editorState={editorState} onChange={setEditorState} />
        </>
    )
}))

export default TextEditor