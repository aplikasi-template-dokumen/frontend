import style from '../../styles/Documents.module.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
// import * as quillToWord from 'quill-to-word'
// import { saveAs } from 'file-saver'

export default function TemplateDetail() {
    const router = useRouter()
    
    const [value, setValue] = useState({})
    const [title, setTitle] = useState('')
    const currentContent = useRef({})

    const modules = {
        toolbar: []
    }

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/t/${router.query.id}`)
            .then((res) => res.json())
            .then((val) => {
                setValue(val.data.data)
                setTitle(val.data.title)
                document.getElementById('doc-image').src = val.data.img
            })
    }, [])

    const QuillNoSSRWrapper = dynamic(import('react-quill'), {
        ssr: false,
        loading: () => <p>Loading . . .</p>
    })

    const handleUseTemplate = async (e) => {
        e.preventDefault()

        if (window.localStorage.getItem('i') == undefined) {
            router.push('/login')
        }

        else {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/d/create`, {
                title: title,
                user_id: window.localStorage.getItem('i'),
                data: value
            })
            .then((val) => {
                router.push({ pathname: `/my/documents/${val.data.data.id}` })
            })
        }
    }

    const handleDownload = async (e) => {
        e.preventDefault()

        // const quillToWordConfiq = { exportAs: 'blob' }
        // const doc = await quillToWord.generateWord(value, quillToWordConfiq)
        // saveAs(doc, 'template.docx')

        var header = "<html xmlns:0='urn:schemas-microsoft-com:office:office'" +
                        "xmlns:w='urn:schemas-microsoft-com:office-word'" +
                        "xmlns:'http://www.w3.org/TR/REC-html40'>" + 
                        "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
            
        var footer = "</body></html>";
        var sourceHTML = header + currentContent.current + footer;

        var source = 'data:application/vnd.ms-word;charset-utf-8,' + encodeURIComponent(sourceHTML);
        var fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'document.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);
    }

    const handleChange = async (content, delta, source, editor) => {
        currentContent.current = editor.getHTML()
    }

    return(
        <>
            <Navbar />

            <div className='main-container'>
                <main>
                    <Link className='backBtn' href='/'><img src='/images/icon-back.png' alt='back-btn' className='backImg' />Kembali ke Halaman Utama</Link>

                    <h1>{title}</h1>
                    <hr />
                    
                    <div className={style.container}>
                        <QuillNoSSRWrapper onChange={handleChange} className={style.document} value={value} modules={modules} placeholder='Nothing here . . .' theme='snow' readOnly />

                        <div className={style.action}>
                            <img id='doc-image' alt='image' />
                            <p id='temp-title'>{title}</p>
                            <Link href='/' onClick={(event) => handleUseTemplate(event)}><button className='btn green-btn'>Gunakan Template</button></Link>
                            <Link href='/' onClick={(event) => handleDownload(event)}><button className='btn blue-btn'>Unduh Template (.doc)</button></Link>
                        </div>
                    </div>
                </main>
            </div>

            <Footer />
        </>
    )
}