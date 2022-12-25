import Head from 'next/head'
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function SubmissionsPage() {
    const [list, setList] = useState([])
    const router = useRouter()

    useEffect(() => {
        const t = typeof window !== 'undefined' ? window.localStorage.getItem('t') : {}

        if (t == null) {
            router.push('/')
        }

        else {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/s?token=${t}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == 404) {
                        setList([])
                    }

                    else {
                        setList(data.data)
                        setUid(data.uid)
                    }
                })
        }
    }, [])

    return(
        <div className='body'>
            <Head>
                <title>TemplateKita</title>
                <meta name="description" content="TemplateKita" />
                <link rel="icon" href="/tab-icon.png" />
            </Head>

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
        </div>
    )
}