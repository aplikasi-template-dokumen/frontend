import NavbarLogin from '../../../components/NavbarLogin'
import style from '../../../styles/MyDocument.module.css'
import Link from 'next/dist/client/link'

export default function TemplateSaya() {
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
                        <tr>
                            <td>Judul Dokumen</td>
                            <td>Status</td>
                            <td>Terakhir Diedit</td>
                        </tr>

                        <tr>
                            <td>Dokumen 1</td>
                            <td>Publish</td>
                            <td>01/11/22</td>
                        </tr>
                            
                        <tr>
                            <td>Dokumen 1</td>
                            <td>Publish</td>
                            <td>01/11/22</td>
                        </tr>
                            
                        <tr>
                            <td>Dokumen 1</td>
                            <td>Publish</td>
                            <td>01/11/22</td>
                        </tr>
                    </table>

                    <Link href='/rahmams/template-saya/create'>
                        <button className={style.btnCreate}>Buat Template Baru</button>
                    </Link>
                </main>
            </div>
        </>
    )
}