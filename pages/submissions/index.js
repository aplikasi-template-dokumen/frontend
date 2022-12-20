import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
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

        if (id == null) {
            router.push('/')
        }

        else {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/s?r=ad`)
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

    return(
        <>
            <Navbar />

            <div className='main-container'>
                <main>
                    <Link className='backBtn' href='/'><img src='/images/icon-back.png' alt='icon' className='backImg'/>Kembali ke Halaman Utama</Link>
                    
                    <h1>Daftar Ajuan Template</h1>
                    <hr />

                    { list.length == 0 ? <p>Belum ada template yang diajukan...</p> : <table className="table"><thead><tr><td>Judul Template</td><td>Kontributor</td><td>Tanggal Diajukan</td></tr></thead><tbody>{ list.map((item) => <tr key={item.id}><td><Link href={`/submissions/${item.id}`}>{item.title}</Link></td><td>{item.contributor.username}</td><td>{item.updatedAt.slice(0, 10)}</td></tr>) }</tbody></table> }
                </main>
            </div>

            <Footer />
        </>
    )
}