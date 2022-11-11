import CKeditor from '../components/CKeditor'
import TinyEditor from '../components/TinyEditor'
import { useEffect, useState } from 'react'
import Editor from '../components/Editor'
// import dynamic from 'next/dynamic'

export default function TesEditor() {
    // const [editorLoaded, setEditorLoaded] = useState(false)
    // const [data, setData] = useState("")

    // useEffect(() => {
    //     setEditorLoaded(true)
    // }, [])

    // const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    //     ssr: false,
    //     loading: () => <p>Loading . . .</p>
    // })

    return(
        // <div>
        //     <CKeditor name="description" onChange={ (data) => { setData(data) } } editorLoaded={editorLoaded} />
        //     {JSON.stringify(data)}
        // </div>
        <>
            {/* <TinyEditor /> */}
            {/* <QuillNoSSRWrapper theme='snow' /> */}
            <Editor />
        </>
    )
}