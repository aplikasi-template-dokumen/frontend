import { useEffect, useRef, useState } from "react"
import dynamic from 'next/dynamic'
// import ReactQuill from "react-quill"


export default function TesQuill() {
    const [value, setValue] = useState({"ops":[{"attributes":{"bold":true},"insert":"Sample Template 1 - Surat Izin"},{"insert":"\n\nBy 'rms'\n"}]})
    const currentContent = useRef(value)

    function submitHandler(event) {
        event.preventDefault()

        console.log('Current content: ', currentContent.current)
    }

    const modules = {
        toolbar: [
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
        ],

        clipboard: {
            //toogle to add extra line breaks when pasting HTML
            matchVisual: false
        }
    }

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video'
    ]

    const QuillNoSSRWrapper = dynamic(import('react-quill'), {
        ssr: false,
        loading: () => <p>Loading . . .</p>
    })

    // const QuillNoSSRWrapper = dynamic (() => import('react-quill').then((q) => console.log(q)))

    function handleChange(content, delta, source, editor) {
        currentContent.current = editor.getContents()
        // console.log(currentContent.current)
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                {/* <QuillNoSSRWrapper onChange={handleChange} value={value} modules={modules} placeholder='Type something here . . .' theme='snow' /> */}
                <label htmlFor="title">Title</label>
                {/* <input type='text' value={title} name="title" placeholder="Enter a title" onChange={handleTitleChange} required /> */}
                <QuillNoSSRWrapper id="text-editor" onChange={handleChange} defaultValue={value} modules={modules} placeholder='Type something here . . .' theme='snow' />
                <button>Save</button>
            </form>
        </>
    )
}