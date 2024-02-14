const Image = ({ alt, src, style }) => {
        if (blockType.blockType === "image") {
            return <img src={src} alt={alt} />
        }
}

export default Image