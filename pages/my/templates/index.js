import Navbar from "../../../components/Navbar"
import style from "../../../styles/MyDocument.module.css"
import Link from "next/link"
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
                    setList(data.data)
                })
        }
    }, [])

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

                    <table>
                        <thead>
                            <tr>
                                <td>Judul Template</td>
                                <td>Status</td>
                                <td>Terakhir Diedit</td>
                            </tr>
                        </thead>

                        <tbody>
                            {/* { list.length == 0 ? "Loading . . ." : list.map((item) => <tr><td><Link key={item.id} href={`/my/templates/${item.id}`}>{item.title}</Link></td><td>{item.status_id}</td><td>{item.updatedAt.slice(0, 10)}</td></tr>) } */}
                            { list.length == 0 ? <tr><td>Belum ada template, nih...</td></tr> : list.map((item) => <tr key={item.id}><td><Link href={`/my/templates/${item.id}`}>{item.title}</Link></td><td>{item.status_id}</td><td>{item.updatedAt.slice(0, 10)}</td></tr>) }
                        </tbody>
                    </table>

                    <Link href='/'>
                        <button className={style.btnCreate}>Buat Template Baru</button>
                    </Link>
                </main>
            </div>
        </>
    )
}