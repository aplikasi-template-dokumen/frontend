import NavbarLogin from '../../../components/NavbarLogin'
import style from '../../../styles/MyDocument.module.css'
import Link from 'next/dist/client/link'

export default function BuatTemplate() {
    return (
        <>
            <NavbarLogin />

            <div className={style.container}>
                <div>
                    <Link href='/rahmams/template-saya'>Kembali ke Template Saya</Link>
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

                    <div className={style.editor}></div>
                    
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