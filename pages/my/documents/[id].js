import Navbar from '../../../components/Navbar'
import style from '../../../styles/MyDocument.module.css'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

export default function MyDocumentDetail() {
    const router = useRouter()
    const [value, setValue] = useState({})
    // const [title, setTitle] = useState('Loading...')

    const currentContent = useRef({})

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
        fetch(`http://127.0.0.1:3001/d/${router.query.id}`)
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
    }

    const handleSubmit = async (e) => {
        const t = document.getElementById('doc-title').value

        if (t == '') {
            console.log('Judul harus diisi')
            e.preventDefault()
            return false
        }

        else {
            const id = typeof window !== 'undefined' ? window.localStorage.getItem('i') : {}
            const response = await axios.post(`http://127.0.0.1:3001/d/${router.query.id}/edit?u_id=${id}`, {
                title: document.getElementById('doc-title').value,
                data: currentContent.current
            })
    
            // console.log(response) -> if status = 201, tampilkan toast
            router.push('/my/documents')
        }

    }

    return(
        <>
            <Navbar />

            <div className={style.container}>
                <div>
                    <Link className='backBtn' href='/my/documents'><img src='/images/icon-back.png' alt='icon' className='backImg'/>Kembali ke Dokumen Saya</Link>
                </div>

                <main>
                    {/* <h1 id='doc-title' contentEditable='true' spellCheck='false'>Loading...</h1> */}
                    <input id='doc-title' type='text' placeholder='Untitled' />
                    <hr />

                    <div className="editor-container">
                        <QuillNoSSRWrapper id='text-editor' value={value} onChange={handleChange} modules={modules} placeholder='Type something here . . .' theme='snow' />
                    </div>

                    <div className={style.btnGroup}>
                        {/* <Link href='/' className={style.btn}>
                            <button className={style.btnHapus}>Hapus</button>
                        </Link> */}

                        <Link href='/' className={style.btn} onClick={(event) => handleSubmit(event)}>
                            <button>Simpan</button>
                        </Link>
                        
                        <Link href='/' className={style.btn}>
                            <button className={style.btnAjukan}>Unduh</button>
                        </Link>
                    </div>
                </main>
            </div>
        </>
    )
}