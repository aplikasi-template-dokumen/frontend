import Navbar from "../../../components/Navbar"
import style from "../../../styles/MyDocument.module.css"
import Link from "next/link"
import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function MyTemplatesPage() {
    const [id, setId] = useState()
    const [list, setList] = useState([])
    const router = useRouter()

    useEffect(() => {
        const id = typeof window !== 'undefined' ? window.localStorage.getItem('i') : {}
        setId(id)
        // console.log('Dari template saya: id = ', id)

        if (id == null) {
            router.push('/')
        }

        else {
            fetch(`http://127.0.0.1:3001/t/user?id=${id}`)
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

        const response = await axios.post(`http://127.0.0.1:3001/t/create`, {
            contributor_id: id
        })
        .then((val) => {
            router.push({ pathname: `/my/templates/${val.data.data.id}` })
            // console.log(val.data.data.id)
        })
    }

    const handleDelete = async (event, t_id) => {
        if (confirm('Hapus template ini?') == true) {
            const response = await axios.delete(`http://127.0.0.1:3001/t/${t_id}/delete`)
            window.location.reload()
        }

        else {
            return false
        }
    }

    return(
        <>
            <Navbar />

            <div className={style.container}>
                <div>
                    <Link className='backBtn' href='/'><img src='/images/icon-back.png' alt='icon' className='backImg'/>Kembali ke Halaman Utama</Link>
                </div>

                <main>
                    <h1>Template Saya</h1>
                    <hr />

                    { list.length == 0 ? <p>Belum ada template...</p> : <table><thead><tr><td>Judul Template</td><td>Status</td><td>Terakhir Diedit</td><td></td></tr></thead><tbody>{ list.map((item) => <tr key={item.id}><td><Link href={`/my/templates/${item.id}`}>{item.title}</Link></td><td>{item.status.name}</td><td>{item.updatedAt.slice(0, 10)}</td><td><img className="iconDel" src='/images/icon-del.png' alt='del' onClick={(event) => handleDelete(event, item.id)}/></td></tr>) }</tbody></table> }


                    <Link href='/' onClick={(event) => handleCreate(event, id)}>
                        <button className={style.btnCreate}>Buat Template Baru</button>
                    </Link>
                </main>
            </div>
        </>
    )
}