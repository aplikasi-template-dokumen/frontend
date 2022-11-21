import NavbarLogin from '../../../components/NavbarLogin'
import style from '../../../styles/MyDocument.module.css'
import Link from 'next/dist/client/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function DokumenSaya() {
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
                    <Link className='backBtn' href='/rahmams'><img src='/images/icon-back.png' alt='icon' className='backImg'/>Kembali ke Halaman Utama</Link>
                </div>

                <main>
                    <h1>Dokumen Saya</h1>
                    <hr />

                    <table>
                        <thead>
                            <tr>
                                <td>Judul Dokumen</td>
                                <td>Terakhir Diedit</td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Dokumen 1</td>
                                <td>01/11/22</td>
                            </tr>
                                
                            <tr>
                                <td>Dokumen 1</td>
                                <td>01/11/22</td>
                            </tr>
                                
                            <tr>
                                <td>Dokumen 1</td>
                                <td>01/11/22</td>
                            </tr>
                        </tbody>
                    </table>

                    <Link href={`/${user}/dokumen-saya/create`}>
                        <button className={style.btnCreate}>Buat Dokumen Baru</button>
                    </Link>
                </main>
            </div>
        </>
    )
}