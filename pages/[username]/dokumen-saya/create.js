import NavbarLogin from '../../../components/NavbarLogin'
import Editor from '../../../components/Editor'
import style from '../../../styles/MyDocument.module.css'
import Link from 'next/dist/client/link'

export default function BuatDokumen() {
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

                    <div className={style.editor}>
                        <Editor className={style.editor} />
                    </div>
                    
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
                </main>
            </div>
        </>
    )
}