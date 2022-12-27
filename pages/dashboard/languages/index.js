import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import style from '../../../styles/Admin.module.css'
import { useRouter } from 'next/router';
import axios from 'axios'

export default function DashboardLanguages() {
    const router = useRouter()
    const [list, setList] = useState([])

    useEffect(() => {
        if (window.localStorage.getItem('t') == undefined) {
            router.push('/')
        }

        else {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/l`)
                .then((res) => res.json())
                .then((data) => {
                    setList(data.data)
                })
        }
    }, [])

    const handleDelete = async (e, id) => {
        if (confirm('Hapus bahasa ini?')) {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/l/${id}/delete?token=${window.localStorage.getItem('t')}`)

            if (response) {
                router.reload()
            }
        }
    }

    return(
        <div className='body'>
            <Head>
                <title>TemplateKita</title>
                <meta name='description' content='TemplateKia' />
                <link rel='icon' href='/tab-icon.png' />
            </Head>

            <Navbar />

            <div className='main-container'>
                <main>
                    <Link className='backBtn' href='/dashboard'><img src='/images/icon-back.png' alt='back-btn' className='backImg' />Kembali ke Dashboard Admin</Link>

                    <h1>Daftar Bahasa</h1>
                    <hr />

                    { list.length == 0 ? <p>Data tidak ditemukan</p> : <table className='table'><thead><tr><td>Id</td><td>Nama</td><td>Order</td><td></td><td></td></tr></thead><tbody>{ list.map((item) => <tr key={item.id}><td>{item.id}</td><td>{item.name}</td><td>{item.order}</td><td><Link href={`/dashboard/languages/${item.id}/edit`}><img className='iconDel' src='/images/icon-edit.png' alt='edit' /></Link></td><td><img className='iconDel' src='/images/icon-del.png' alt='delete' onClick={(event) => handleDelete(event, item.id)}/></td></tr>) }</tbody></table> }

                    <Link className={style.btn} href='/dashboard/languages/create'>
                        <button className={`btn blue-btn ${style.btnCreate}`}>Tambah Bahasa</button>
                    </Link>
                </main>
            </div>

            <Footer />
        </div>
    )
}