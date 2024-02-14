import { useEffect, useState } from "react"
import styles from "./Controller.module.scss"
import { RichUtils } from "draft-js"

const Controller = ({ children, type = null, editorState, setEditorState, block = null }) => {
    const getCurrentBlockType = () => {
        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();
        const blockMap = contentState.getBlockMap();
        const currentBlock = blockMap.get(selection.getStartKey());
        return currentBlock.getType() === block;
    }

    const hasModify = type ? editorState.getCurrentInlineStyle().has(type) : getCurrentBlockType()

    const [ active, setActive ] = useState(false)

    useEffect(() => { hasModify ? setActive(true) : setActive(false) }, [editorState])

    const classes = [styles.button, active ? styles.active : ""]

    const toggleStyle = (style) => (event) => {
        event.preventDefault()

        setEditorState(RichUtils.toggleInlineStyle(editorState, style))
    }

    const toggleBlock = (block) => (event) => {
        event.preventDefault()

        setEditorState(RichUtils.toggleBlockType(editorState, block))
    }

    return (
        <button onMouseDown={block ? toggleBlock(block) : toggleStyle(type)} className={classes.join(" ")}>
            { children }
        </button>
    )
}

export default Controller