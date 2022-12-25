import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import style from '../../../styles/Admin.module.css'
import { useRouter } from 'next/router'

export default function DashboardDocuments() {
    const router = useRouter()
    const [list, setList] = useState([])

    useEffect(() => {
        const t = typeof window !== 'undefined' ? window.localStorage.getItem('t') : {}

        if (t == undefined) {
            router.push('/')
        }

        else {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/d?token=${t}`)
                .then((res) => res.json())
                .then((data) => {
                    setList(data.data)
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
                    <Link className='backBtn' href='/dashboard'><img src='/images/icon-back.png' alt='back-btn' className='backImg' />Kembali ke Dashboard Admin</Link>

                    <h1>Data Dokumen</h1>
                    <hr />

                    { list.length == 0 ? <p>Data tidak ditemukan</p> : <table className='table'><thead><tr><td>Id</td><td>Judul</td><td>Username</td><td>Terakhir Diedit</td><td></td><td></td></tr></thead><tbody>{ list.map((item) => <tr key={item.id}><td>{item.id}</td><td>{item.title}</td><td>{item.user_id}</td><td>{item.updatedAt.slice(0, 10)}</td><td><Link href={`/dashboard/documents/${item.id}/edit`}><img className='iconDel' src='/images/icon-edit.png' alt='edit' /></Link></td><td><img className='iconDel' src='/images/icon-del.png' alt='delete' /></td></tr>) }</tbody></table> }
                    
                    <Link className={style.btn} href='/documents/create'>
                        <button className={`btn blue-btn ${style.btnCreate}`}>Tambah Dokumen</button>
                    </Link>
                </main>
            </div>

            <Footer />
        </div>
    )
}