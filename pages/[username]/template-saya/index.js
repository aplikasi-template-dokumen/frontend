import NavbarLogin from '../../../components/NavbarLogin'
import style from '../../../styles/MyDocument.module.css'
import Link from 'next/dist/client/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function TemplateSaya() {
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
                    <h1>Template Saya</h1>
                    <hr />

                    <table>
                        <thead>
                            <tr>
                                <td>Judul Dokumen</td>
                                <td>Status</td>
                                <td>Terakhir Diedit</td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Dokumen 1</td>
                                <td>Publish</td>
                                <td>01/11/22</td>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr>
                                <td>Dokumen 1</td>
                                <td>Publish</td>
                                <td>01/11/22</td>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr>
                                <td>Dokumen 1</td>
                                <td>Publish</td>
                                <td>01/11/22</td>
                            </tr>
                        </tbody>    
                    </table>

                    <Link href={`/${user}/template-saya/create`}>
                        <button className={style.btnCreate}>Buat Template Baru</button>
                    </Link>
                </main>
            </div>
        </>
    )
}