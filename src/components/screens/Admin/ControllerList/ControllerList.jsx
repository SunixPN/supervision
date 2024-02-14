import Controller from "./Controller/Controller"
import styles from "./ControllerList.module.scss"

const ControllerList = ({ editorState, setEditorState }) => {
    const types = [
        {
            id: 1,
            style: "BOLD" 
        },
        {
            id: 2,
            style: "ITALIC" 
        },
        {
            id: 3,
            style: "UNDERLINE" 
        },
        {
            id: 4,
            style: "STRIKETHROUGH" 
        },
        {
            id: 5,
            style: "CODE" 
        },
    ]
    const blocks = [
        {
            id: 1,
            style: "header-one",
            title: "H1"
        },
        {
            id: 2,
            style: "header-two",
            title: "H2"
        },
        {
            id: 3,
            style: "unordered-list-item",
            title: "UL"
        },
        {
            id: 4,
            style: "ordered-list-item",
            title: "OL"
        },
        {
            id: 5,
            style: "blockquote",
            title: "Blockquote"
        },
        {
            id: 6,
            style: "code-block",
            title: "Code Block"
        },
        {
            id: 7,
            style: "paragraph",
            title: "P"
        }
    ]

    return (
        <div className={styles.list}>
            {
                types.map(type => 
                <Controller key={type.id} editorState={editorState} setEditorState={setEditorState} type={type.style}>
                    { type.style }
                </Controller>)
            }
            {
                blocks.map(block => 
                <Controller key={block.id} editorState={editorState} setEditorState={setEditorState} block={block.style}>
                    { block.title }
                </Controller>
                )
            }
        </div>
    )
}

export default ControllerList