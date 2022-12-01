import React, { useEffect, useReducer, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

export default function QuillEditor() {
    //
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
        ]
    }

    // const initialState = { data: data.data.data }
    // const [state, dispatch] = useReducer(reducer, initialState)

    const [value, setValue] = useState({})

    // useEffect(() => {
    //     if (data.data.data != null) {
    //         setValue(data.data.data)
    //     }
    // }, [])

    function handleChange(content, delta, source, editor) {
        setValue(editor.getContents())
        // setValue(delta)
    }

    // console.log(value)

    return (
        <div className="editor-container">
            <ReactQuill onChange={handleChange} value={value} modules={modules} theme="snow" placeholder="Type something here . . ." />
        </div>
    )
}