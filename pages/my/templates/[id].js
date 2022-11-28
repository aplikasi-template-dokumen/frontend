import Navbar from "../../../components/Navbar"
import QuillEditor from "../../../components/Quill"
import style from '../../../styles/MyDocument.module.css'
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

export default function MyTemplateDetail() {
    const router = useRouter()
    const [id, setId] = useState()
    const [data, setData] = useState({})

    // const [title, setTitle] = useState(data.title)
    // const [desc, setDesc] = useState(data.desc)
    // const [notes, setNotes] = useState(data.notes)

    useEffect(() => {
        const id = typeof window !== 'undefined' ? window.localStorage.getItem('i') : {}
        setId(id)

        if (id == null) {
            router.push('/')
        }

        else {
            fetch(`http://127.0.0.1:3001/t/${router.query.id}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.data)
                setData(data.data)
            })
        }
    }, [])

    return(
        <>
            <Navbar />

            <div className={style.container}>
                <div>
                    <Link className='backBtn' href='/my/templates'><img src='/images/icon-back.png' alt='icon' className='backImg'/>Kembali ke Template Saya</Link>
                </div>

                <main>
                    {/* <h1>Buat Template</h1> */}
                    <h1>{data.title}</h1>
                    <hr />

                    <div className={style.reqBox}></div>

                    <form className={style.form}>
                        <div>
                            <p>Judul Template</p>
                            <input type='text' value={data.title} required />
                            {/* <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} required /> */}
                        </div>

                        <div>
                            <p>Deskripsi</p>
                            <input type='text' value={data.desc} />
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
                            <input type='file' />
                        </div>

                        <div>
                            <p>Catatan</p>
                            <input type='text' value={data.notes} />
                        </div>
                    </form>

                    <QuillEditor data={data} />

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