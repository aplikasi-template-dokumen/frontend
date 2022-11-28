import Navbar from "../../../components/Navbar"
import style from "../../../styles/MyDocument.module.css"
import Link from "next/link"
import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function MyDocumentsPage() {
    const [id, setId] = useState()
    const [list, setList] = useState([])
    const router = useRouter()

    useEffect(() => {
        const id = typeof window !== 'undefined' ? window.localStorage.getItem('i') : {}
        setId(id)
        // console.log('Dari dokumen saya: id = ', id)

        if (id == null) {
            router.push('/')
        }

        else {
            fetch(`http://127.0.0.1:3001/d/user?id=${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setList(data.data)
                })
        }
    }, [])

    const handleCreate = async (event, id) => {
        event.preventDefault()

        const response = await axios.post(`http://127.0.0.1:3001/d/create`, {
            title: 'Untitled',
            user_id: id,
            data: null
        })
        .then((val) => {
            router.push({ pathname: `/my/documents/${val.data.data.id}` })
            // console.log(val.data.data.id)
        })
    }

    return(
        <>
            <Navbar />

            <div className={style.container}>
                <div>
                    <Link className='backBtn' href='/'><img src='/images/icon-back.png' alt='back-btn' className='backImg' />Kembali ke Halaman Utama</Link>
                </div>
                
                <main>
                    <h1>Dokumen Saya</h1>
                    <hr />

                    <table>
                        <thead>
                            <tr>
                                <td>Judul Dokumen</td>
                                <td>Terakhir Diedit</td>
                            </tr>
                        </thead>

                        <tbody>
                            { list.length == 0 ? <tr><td>Belum ada dokumen, nih...</td></tr> : list.map((item) => <tr key={item.id}><td><Link href={`/my/documents/${item.id}`}>{item.title}</Link></td><td>{item.updatedAt.slice(0, 10)}</td></tr>) }
                        </tbody>
                    </table>

                    <Link href='/' onClick={(event) => handleCreate(event, id)}>
                        <button className={style.btnCreate}>Buat Dokumen Baru</button>
                    </Link>
                </main>
            </div>
        </>
    )
}