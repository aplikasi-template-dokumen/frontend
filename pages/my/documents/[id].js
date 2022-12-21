import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import style from '../../../styles/MyDocument.module.css'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
// import * as quillToWord from 'quill-to-word'
// import { saveAs } from 'file-saver'

export default function MyDocumentDetail() {
    const router = useRouter()
    const [value, setValue] = useState({})
    // const [title, setTitle] = useState('Loading...')

    const currentContent = useRef({})
    const currentContentHTML = useRef({})

    // useEffect(() => {
    //     const id = typeof window !== 'undefined' ? window.localStorage.getItem('i') : {}
    //     setId(id)

    //     if (id == null) {
    //         router.push('/')
    //     }

    //     else {
    //         //fetch data
    //     }
    // }, [])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/d/${router.query.id}`)
            .then((res) => res.json())
            .then((val) => {
                setValue(val.data.data)
                // setTitle(val.data.title)
                document.getElementById('doc-title').value = val.data.title
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

    const QuillNoSSRWrapper = dynamic(import('react-quill'), {
        ssr: false,
        loading: () => <p>Loading . . .</p>
    })

    function handleChange(content, delta, source, editor) {
        currentContent.current = editor.getContents()
        currentContentHTML.current = editor.getHTML()
    }

    const handleSubmit = async (e) => {
        const title = document.getElementById('doc-title').value

        if (title == '') {
            console.log('Judul harus diisi')
            e.preventDefault()
            return false
        }

        else {
            const t = typeof window !== 'undefined' ? window.localStorage.getItem('t') : {}
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/d/${router.query.id}/edit?token=${t}`, {
                title: document.getElementById('doc-title').value,
                data: currentContent.current
            })
    
            // console.log(response) -> if status = 201, tampilkan toast
            router.push('/my/documents')
        }

    }

    const handleDownload = async (e) => {
        e.preventDefault()

        // const quillToWordConfiq = { exportAs: 'blob' }
        // const doc = await quillToWord.generateWord(currentContent.current, quillToWordConfiq)
        // saveAs(doc, 'template.docx')

        var header = "<html xmlns:0='urn:schemas-microsoft-com:office:office'" +
                        "xmlns:w='urn:schemas-microsoft-com:office-word'" +
                        "xmlns:'http://www.w3.org/TR/REC-html40'>" + 
                        "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
            
        var footer = "</body></html>";
        var sourceHTML = header + currentContentHTML.current + footer;

        var source = 'data:application/vnd.ms-word;charset-utf-8,' + encodeURIComponent(sourceHTML);
        var fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'document.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);
    }

    return(
        <div className='body'>
            <Navbar />

            <div className='main-container'>
                <main>
                    <Link className='backBtn' href='/my/documents'><img src='/images/icon-back.png' alt='icon' className='backImg'/>Kembali ke Dokumen Saya</Link>
                    {/* <h1 id='doc-title' contentEditable='true' spellCheck='false'>Loading...</h1> */}
                    <input id='doc-title' className={style.docTitle} type='text' placeholder='Untitled' />
                    <hr />

                    <QuillNoSSRWrapper className='text-editor' value={value} onChange={handleChange} modules={modules} placeholder='Type something here . . .' theme='snow' />

                    <div className={style.btnGroup}>
                        <Link href='/' className={style.btn} onClick={(event) => handleSubmit(event)}>
                            <button className='btn blue-btn'>Simpan</button>
                        </Link>
                            
                        <Link href='/' className={style.btn}>
                            <button className='btn green-btn' onClick={(event) => handleDownload(event)}>Unduh</button>
                        </Link>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    )
}