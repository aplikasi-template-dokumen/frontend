import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
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

        if (id == null) {
            router.push('/')
        }

        else {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/d/user?id=${id}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == 404) {
                        setList([])
                    }

                    else {
                        setList(data.data)
                    }
                })
        }
    }, [])

    const handleCreate = async (event, id) => {
        event.preventDefault()

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/d/create`, {
            title: 'Untitled',
            user_id: id,
            data: null
        })
        .then((val) => {
            router.push({ pathname: `/my/documents/${val.data.data.id}` })
        })
    }

    const handleDelete = async (event, d_id) => {
        if (confirm('Hapus dokumen ini?') == true) {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/d/${d_id}/delete`)
            window.location.reload()
        }

        else {
            return false
        }
    }

    return(
        <>
            <Navbar />

            <div className='main-container'>
                <main>
                    <Link className='backBtn' href='/'><img src='/images/icon-back.png' alt='back-btn' className='backImg' />Kembali ke Halaman Utama</Link>

                    <h1>Dokumen Saya</h1>
                    <hr />
                    
                    { list.length == 0 ? <p>Belum ada dokumen...</p> : <table className="table"><thead><tr><td>Judul Dokumen</td><td>Terakhir Diedit</td><td></td></tr></thead><tbody>{ list.map((item) => <tr key={item.id}><td><Link href={`/my/documents/${item.id}`}>{item.title}</Link></td><td>{item.updatedAt.slice(0, 10)}</td><td><img className="iconDel" src='/images/icon-del.png' alt='del' onClick={(event) => handleDelete(event, item.id)}/></td></tr>) }</tbody></table> }

                    <Link href='/' onClick={(event) => handleCreate(event, id)}>
                        <button className={`btn blue-btn ${style.btnCreate}`}>Buat Dokumen Baru</button>
                    </Link>
                </main>
            </div>

            <Footer />
        </>
    )
}