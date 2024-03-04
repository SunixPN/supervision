import { Editor, EditorState, Modifier, RichUtils, getDefaultKeyBinding } from "draft-js"
import { forwardRef } from "react"
import ControllerList from "./ControllerList/ControllerList"
import { memo } from "react"
import "draft-js/dist/Draft.css"

const TextEditor = memo(forwardRef(({ editorState, setEditorState }, ref) => {
    const keyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)

        newState && setEditorState(newState)
    }

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