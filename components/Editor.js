import style from '../styles/Editor.module.css'
import dynamic from 'next/dynamic'

export default function Editor() {
    const TOOLBAR_OPTIONS = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["image", "blockquote", "code-block"],
        [{ direction: 'rtl' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ["link", "image", "video", "formula"],
        ["clean"]
    ]

    const QuillNoSSRWrapper = dynamic(import('react-quill'), {
        ssr: false,
        loading: () => <p>Loading . . .</p>
    })

    function getData(e) {
        e.preventDefault()
        const delta = QuillNoSSRWrapper.value
        console.log(delta)
    }


    return (
        <div className='container'>
            <QuillNoSSRWrapper theme='snow' />
            {/* <QuillNoSSRWrapper theme='snow' modules={toolbar={TOOLBAR_OPTIONS}} /> */}
            <button onClick={(event) => getData(event)}>Get Data</button>
        </div>
    )
}