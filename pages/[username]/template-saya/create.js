import NavbarLogin from '../../../components/NavbarLogin'
import Editor from '../../../components/Editor'
import style from '../../../styles/MyDocument.module.css'
import Link from 'next/dist/client/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function BuatTemplate() {
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
                    <Link className='backBtn' href='/rahmams/template-saya'><img src='/images/icon-back.png' alt='icon' className='backImg'/>Kembali ke Template Saya</Link>
                </div>

                <main>
                    <h1>Buat Template Baru</h1>
                    <hr />

                    <div className={style.reqBox}></div>

                    <form className={style.form}>
                        <div>
                            <p>Judul Template</p>
                            <input type='text' />
                        </div>
                        
                        <div>
                            <p>Deskripsi</p>
                            <input type='text' />
                        </div>

                        <div>
                            <p>Bahasa</p>
                            <select>
                                <option>Pilih Bahasa</option>
                                <option>Indonesia</option>
                                <option>Inggris</option>
                            </select>
                        </div>
                        
                        <div>
                            <p>Kategori</p>
                            <select>
                                <option>Pilih Kategori</option>
                                <option>Surat</option>
                                <option>Proposal</option>
                                <option>Laporan</option>
                                <option>Tugas</option>
                                <option>Karya Tulis Ilmiah</option>
                            </select>
                        </div>
                        
                        <div>
                            <p>Sub Kategori</p>
                            <select>
                                <option>Pilih Sub Kategori</option>
                                <option>Surat</option>
                                <option>Proposal</option>
                                <option>Laporan</option>
                                <option>Tugas</option>
                                <option>Karya Tulis Ilmiah</option>
                            </select>
                        </div>
                        
                        <div>
                            <p>Gambar Preview</p>
                            <input type='text' />
                        </div>

                        <div>
                            <p>Catatan</p>
                            <input type='' />
                        </div>
                    </form>

                    <div className={style.editor}>
                        <Editor className={style.editor}/>
                    </div>
                    
                    <div className={style.btnGroup}>
                        <Link href='/' className={style.btn}>
                            <button className={style.btnHapus}>Hapus</button>
                        </Link>

                        <Link href='/' className={style.btn}>
                            <button>Simpan</button>
                        </Link>

                        <Link href='/' className={style.btn}>
                            <button className={style.btnAjukan}>Ajukan</button>
                        </Link>
                    </div>
                </main>
            </div>
        </>
    )
}