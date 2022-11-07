import NavbarLogin from '../../../components/NavbarLogin'
import style from '../../../styles/MyDocument.module.css'
import Link from 'next/dist/client/link'

export default function DokumenSaya() {
    return (
        <>
            <NavbarLogin />

            <div className={style.container}>
                <div>
                    <Link href='/rahmams'>Kembali ke Halaman Utama</Link>
                </div>

                <main>
                    <h1>Dokumen Saya</h1>
                    <hr />

                    <div className={style.head}>
                        <p>Judul Dokumen</p>
                        <p>Terakhir Diedit</p>
                    </div>
                    
                    <div className={style.list}>
                        <p>Dokumen 1</p>
                        <p>01/11/22</p>
                    </div>
                    
                    <div className={style.list}>
                        <p>Dokumen 2</p>
                        <p>01/11/22</p>
                    </div>
                    
                    <div className={style.list}>
                        <p>Dokumen 3</p>
                        <p>01/11/22</p>
                    </div>

                    <Link href='/rahmams/dokumen-saya/create'>
                        <button className={style.btnCreate}>Buat Dokumen Baru</button>
                    </Link>
                </main>
            </div>
        </>
    )
}