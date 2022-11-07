import NavbarLogin from '../../../components/NavbarLogin'
import style from '../../../styles/MyDocument.module.css'
import Link from 'next/dist/client/link'

export default function BuatDokumen() {
    return (
        <>
            <NavbarLogin />

            <div className={style.container}>
                <div>
                    <Link href='/rahmams/dokumen-saya'>Kembali ke Dokumen Saya</Link>
                </div>

                <main>
                    <h1>Judul Dokumen</h1>
                    <hr />
                    
                    <div className={style.btnGroup}>
                        <Link href='/'>
                            <button>Hapus</button>
                        </Link>

                        <Link href='/'>
                            <button>Simpan</button>
                        </Link>

                        <Link href='/'>
                            <button>Unduh</button>
                        </Link>
                    </div>
                </main>
            </div>
        </>
    )
}