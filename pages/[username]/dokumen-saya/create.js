import NavbarLogin from '../../../components/NavbarLogin'
import QuillEditor from '../../../components/Quill'
import style from '../../../styles/MyDocument.module.css'
import Link from 'next/dist/client/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Quill } from 'react-quill'
import axios from 'axios'

export default function BuatDokumen() {
    const user = typeof window !== 'undefined' ? window.localStorage.getItem('u') : {}
    const router = useRouter()

    useEffect(() => {
        if (user === null) {
            router.push(`/`)
        }
    })

    return (
        <>
            <NavbarLogin />

            <div className={style.container}>
                <div>
                    <Link className='backBtn' href='/rahmams/dokumen-saya'><img src='/images/icon-back.png' alt='icon' className='backImg'/>Kembali ke Dokumen Saya</Link>
                </div>

                <main>
                    <h1>Judul Dokumen</h1>
                    <hr />

                    <QuillEditor />
                    
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
            {/* <script src='../../../../editor.js'></script> */}
        </>
    )
}