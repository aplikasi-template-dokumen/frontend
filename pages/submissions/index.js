import Navbar from "../../components/Navbar"
import style from "../../styles/MyDocument.module.css"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function SubmissionsPage() {
    const [id, setId] = useState()
    const [list, setList] = useState([])
    const router = useRouter()

    useEffect(() => {
        const id = typeof window !== 'undefined' ? window.localStorage.getItem('i') : {}
        setId(id)
        // console.log('Dari daftar ajuan: id = ', id)

        if (id == null) {
            router.push('/')
        }

        else {
            fetch(`http://127.0.0.1:3001/s?r=ad`)
                .then((res) => res.json())
                .then((data) => {
                    // setList(data.data)
                    // console.log(data)
                    if (data.status == 404) {
                        setList([])
                    }

                    else {
                        setList(data.data)
                    }
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
                    <h1>Daftar Ajuan Template</h1>
                    <hr />

                    {/* <table>
                        <thead>
                            <tr>
                                <td>Judul Template</td>
                                <td>Kontributor</td>
                                <td>Tanggal Diajukan</td>
                            </tr>
                        </thead>

                        <tbody>
                            { list.length == 0 ? <tr><td>Belum ada template yang diajukan</td></tr> : list.map((item) => <tr key={item.id}><td><Link href={`/my/submissions/${item.id}`}>{item.title}</Link></td><td>{item.contributor_id}</td><td>{item.updatedAt.slice(0, 10)}</td></tr>) }
                        </tbody>
                    </table> */}

                    { list.length == 0 ? <p>Belum ada template yang diajukan...</p> : <table><thead><tr><td>Judul Template</td><td>Kontributor</td><td>Tanggal Diajukan</td></tr></thead><tbody>{ list.map((item) => <tr key={item.id}><td><Link href={`/submissions/${item.id}`}>{item.title}</Link></td><td>{item.contributor_id}</td><td>{item.updatedAt.slice(0, 10)}</td></tr>) }</tbody></table> }
                </main>
            </div>
        </>
    )
}