import style from '../styles/Editor.module.css'
import dynamic from 'next/dynamic'

export default function Editor() {
    const TOOLBAR_OPTIONS = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ align: [] }],
        ["image", "blockquote", "code-block"],
        ["clean"]
    ]

    const QuillNoSSRWrapper = dynamic(import('react-quill'), {
        ssr: false,
        loading: () => <p>Loading . . .</p>
    })

    return (
        <div className='container'>
            <QuillNoSSRWrapper theme='snow' />
            {/* <QuillNoSSRWrapper theme='snow' modules={toolbar={TOOLBAR_OPTIONS}} /> */}
        </div>
    )
}