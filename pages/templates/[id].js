import style from '../../styles/Documents.module.css'
import Navbar from '../../components/Navbar'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function TemplateDetail() {
    const router = useRouter()
    
    const [value, setValue] = useState({})
    const [title, setTitle] = useState('')
    const modules = {
        toolbar: []
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:3001/t/${router.query.id}`)
            .then((res) => res.json())
            .then((val) => {
                setValue(val.data.data)
                setTitle(val.data.title)
                // console.log(val.data.title)
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
            // console.log('Bisa digunakan')
            const response = await axios.post(`http://127.0.0.1:3001/d/create`, {
                title: title,
                user_id: window.localStorage.getItem('i'),
                data: value
            })
            .then((val) => {
                router.push({ pathname: `/my/documents/${val.data.data.id}` })
            })
        }
    }

    return(
        <>
            <Navbar />

            <div className={style.container}>
                {/* <div className={style.document}> */}
                <div className='editor-container'>
                    <QuillNoSSRWrapper value={value} modules={modules} placeholder='Nothing here . . .' theme='snow' readOnly />
                </div>
                {/* </div> */}

                <div className={style.action}>
                    <p id='temp-title'>{title}</p>
                    <Link href='/' onClick={(event) => handleUseTemplate(event)}><button>Gunakan Template</button></Link>
                    <Link href='/'><button>Unduh Template (.doc)</button></Link>
                </div>
            </div>
        </>
    )
}