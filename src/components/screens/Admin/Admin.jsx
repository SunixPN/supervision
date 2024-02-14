import { Editor, EditorState, Modifier, RichUtils, AtomicBlockUtils, getDefaultKeyBinding, convertToRaw } from "draft-js"
import { addImage, createDecorator, findEntitiesOf } from "contenido"
import { useRef, useState } from "react"
import "draft-js/dist/Draft.css"
import ControllerList from "./ControllerList/ControllerList"
import Image from "./Image/Image"

const Admin = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

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

    const handleAddImage = (event) => {
        event.preventDefault()

        const imageProps = {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSl_clH67N90bN11QW8zLQU3jG_5cbA1Y1tsxfe7GDUA&s",
            alt: "ALT",
            style: { width: 200, height: 200 }
        }

        addImage(editorState, setEditorState, imageProps)
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
            <button onMouseDown={handleAddImage}>RFHNBYRF</button>
            <ControllerList editorState={editorState} setEditorState={setEditorState} />
            <Editor ref={ref} keyBindingFn={handleTab} handleKeyCommand={keyCommand} editorState={editorState} onChange={setEditorState} />
        </>
    )
}

export default Admin