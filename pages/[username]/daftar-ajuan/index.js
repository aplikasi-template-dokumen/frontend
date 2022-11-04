import NavbarLogin from '../../../components/NavbarLogin'
import style from '../../../styles/MyDocument.module.css'
import Link from 'next/dist/client/link'

export default function TemplateAjuan() {
    return (
        <>
            <NavbarLogin />

            <div className={style.container}>
                <div>
                    <Link href='/rahmams'>Kembali ke Halaman Utama</Link>
                </div>

                <main>
                    <h1>Daftar Ajuan Template</h1>
                    <hr />

                    <div className={style.head}>
                        <p>Judul Template</p>
                        <p>Kontributor</p>
                        <p>Periksa</p>
                    </div>
                    
                    <div>
                        <p>Template 1</p>
                        <p>rahmams68</p>
                        <button>Review</button>
                    </div>
                    
                    <div>
                        <p>Template 2</p>
                        <p>rahmams68</p>
                        <button>Review</button>
                    </div>
                    
                    <div>
                        <p>Template 3</p>
                        <p>rahmams68</p>
                        <button>Review</button>
                    </div>
                </main>
            </div>
        </>
    )
}