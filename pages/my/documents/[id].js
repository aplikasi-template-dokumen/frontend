import Navbar from '../../../components/Navbar'
import QuillEditor from '../../../components/Quill'
import style from '../../../styles/MyDocument.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function MyDocumentDetail() {
    const [id, setId] = useState()
    const [data, setData] = useState({})
    const router = useRouter()

    useEffect(() => {
        const id = typeof window !== 'undefined' ? window.localStorage.getItem('i') : {}
        setId(id)

        if (id == null) {
            router.push('/')
        }

        else {
            fetch(`http://127.0.0.1:3001/d/${router.query.id}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.data)
                setData(data.data)
            })
        }
    }, [])

    return(
        <>
            <Navbar />

            <div className={style.container}>
                <div>
                    <Link className='backBtn' href='/my/documents'><img src='/images/icon-back.png' alt='icon' className='backImg'/>Kembali ke Dokumen Saya</Link>
                </div>

                <main>
                    <h1>{data.title}</h1>
                    <hr />

                    {/* <QuillEditor /> */}
                    <QuillEditor data={data} />

                    <div className={style.btnGroup}>
                        <Link href='/' className={style.btn}>
                            <button className={style.btnHapus}>Hapus</button>
                        </Link>

                        <Link href='/' className={style.btn}>
                            <button>Simpan</button>
                        </Link>
                        
                        <Link href='/' className={style.btn}>
                            <button className={style.btnAjukan}>Unduh</button>
                        </Link>
                    </div>

                    {/* <button id='btnSave'>Simpan Data</button> */}
                </main>
            </div>
        </>
    )
}