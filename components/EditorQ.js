import style from '../styles/Editor.module.css'
import dynamic from 'next/dynamic'
import { useCallback, useEffect } from 'react'
// import { Quill } from 'react-quill'
import Quill from 'quill'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function EditorQ() {
    useEffect(() => {
        ////
    }, [])

    const router = useRouter()

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

    // const wrapperRef = useCallback(wrapper => {
    //     if (wrapper == null) return

    //     wrapper.innerHTML = ""
    //     const editor = document.createElement('div')
    //     wrapper.append(editor)
    //     new Quill(editor, { theme: 'snow' })
    // })


    // const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    //     ssr: false,
    //     loading: () => <p>Loading . . .</p>
    // })

    // useEffect(() => {
    // }, [])
    
    const quill = new Quill('#container', {
        modules: {
            toolbar: TOOLBAR_OPTIONS
        },

        theme: 'snow',
    })

    console.log(quill)
    // const quill = new Quill('#editor', {
    //     modules: {
    //         toolbar: TOOLBAR_OPTIONS
    //     },

    //     theme: 'snow'
    // })
    
    function getData(e) {
        e.preventDefault()
        const delta = quill.getContents()
        console.log(delta)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const delta = quill.getContents
            console.log(delta)

            const response = await axios.post('http://127.0.0.1:3001/doc/add', {
                title: 'Dokumen',
                data: quill.getContents()
            })
            .then((val) => {
                console.log(val.data)
                router.push('/')
            })
        }

        catch(err) {
            console.log(err)
        }
    }

    return (
        // <div className='container'>
        //     <QuillNoSSRWrapper theme='snow' />
        //     {/* <QuillNoSSRWrapper theme='snow' modules={toolbar={TOOLBAR_OPTIONS}} /> */}
        // </div>

        // <div id='container' className={style.container} ref={wrapperRef}></div>
        <>
            <div id='container' className={style.container}></div>
            <button onClick={(event) => getData(event)}>Get Data to Console</button>
            <button onClick={(event) => handleSubmit(event)}>Save Data</button>
        </>
    )
}