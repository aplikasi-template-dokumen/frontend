import NavbarLogin from '../../../components/NavbarLogin'
import style from '../../../styles/MyDocument.module.css'
import Link from 'next/dist/client/link'

export default function TemplateSaya() {
    return (
        <>
            <NavbarLogin />

            <div className={style.container}>
                <div>
                    <Link href='/rahmams'>Kembali ke Halaman Utama</Link>
                </div>

                <main>
                    <h1>Template Saya</h1>
                    <hr />

                    <div className={style.head}>
                        <p>Judul Template</p>
                        <p>Status</p>
                        <p>Terakhir Diedit</p>
                    </div>
                    
                    <div className={style.list}>
                        <p>Template 1</p>
                        <p>Publish</p>
                        <p>01/11/22</p>
                    </div>
                    
                    <div className={style.list}>
                        <p>Template 2</p>
                        <p>Publish</p>
                        <p>01/11/22</p>
                    </div>
                    
                    <div className={style.list}>
                        <p>Template 3</p>
                        <p>Publish</p>
                        <p>01/11/22</p>
                    </div>

                    <Link href='/rahmams/template-saya/create'>
                        <button className={style.btnCreate}>Buat Template Baru</button>
                    </Link>
                </main>
            </div>
        </>
    )
}