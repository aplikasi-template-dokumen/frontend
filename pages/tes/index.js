import { useEffect, useState } from "react"
import dynamic from 'next/dynamic'


export default function TesQuill() {
    const [value, setValue] = useState({})

    useEffect(() => {
        fetch(`http://127.0.0.1:3001/d/3`)
            .then((res) => res.json())
            .then((val) => {
                console.log(val.data)
                setValue(val.data.data)
            })
    }, [])

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

    function handleChange(content, delta, source, editor) {
        console.log('Delta: ', editor.getContents())
    }

    return (
        <>
            <div className="editor-container">
                <QuillNoSSRWrapper onChange={handleChange} value={value} modules={modules} placeholder='Type something here . . .' theme='snow' />
            </div>
        </>
    )
}