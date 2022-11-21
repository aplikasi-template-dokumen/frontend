import NavbarLogin from '../../../components/NavbarLogin'
import style from '../../../styles/MyDocument.module.css'
import Link from 'next/dist/client/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function TemplateAjuan() {
    const user = typeof window !== 'undefined' ? window.localStorage.getItem('u') : {}
    const router = useRouter()

    useEffect(() => {
        if (user === null) {
            router.push('/')
        }

        //axios here
    })

    return (
        <>
            <NavbarLogin />

            <div className={style.container}>
                <div>
                    <Link className='backBtn' href='/rahmams'><img src='/images/icon-back.png' alt='icon' className='backImg'/>Kembali ke Halaman Utama</Link>
                </div>

                <main>
                    <h1>Daftar Ajuan Template</h1>
                    <hr />

                    <table>
                        <tr>
                            <td>Judul Template</td>
                            <td>Kontributor</td>
                            <td>Tanggal Diajukan</td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>Template 1</td>
                            <td>rahmams68</td>
                            <td>01/11/22</td>
                            <button>Review</button>                            
                        </tr>
                            
                        <tr>
                            <td>Template 2</td>
                            <td>rahmams68</td>
                            <td>01/11/22</td>
                            <button>Review</button>                            
                        </tr>

                        <tr>
                            <td>Template 3</td>
                            <td>rahmams68</td>
                            <td>01/11/22</td>
                            <button>Review</button>                            
                        </tr>
                    </table>
                </main>
            </div>
        </>
    )
}