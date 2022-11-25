import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

export default function QuillEditorReadOnly() {
    const router = useRouter()

    const modules = {
        toolbar: []
    }

    const [value, setValue] = useState({})

    useEffect(() => {
        fetch(`http://127.0.0.1:3001/t/${router.query.id}`)
            .then((res) => res.json())
            .then((data) => {
                setValue(data.data.data)
            })
    })

    return (
        <div className="read-editor-container">
            <ReactQuill readOnly value={value} modules={modules} theme="snow" placeholder="Type something here . . ." />
        </div>
    )
}