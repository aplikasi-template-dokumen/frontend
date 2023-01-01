import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import style from '../../../styles/Admin.module.css'
import axios from 'axios'

export default function DashboardUsers() {
    const [list, setList] = useState([])
    
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/u?token=${window.localStorage.getItem('t')}`)
            .then((res) => res.json())
            .then((data) => {
                setList(data.data)
            })
    }, [])

    const handleDelete = async (event, u_id) => {
        if (confirm('Hapus user ini?') == true) {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/u/${u_id}/delete?token=${window.localStorage.getItem('t')}`)
            window.location.reload()
            // if (confirm('Seriusan mau dihapus?' == true)) {
            //     if (confirm('Yakin???') == true) {
            //         if (confirm('Jangan nyesel ya..') == true) {
            //             if (confirm('Sip, terakhir ya... Hapus nih?') == true) {
            //                 alert('Ceritanya kehapus..')
            //             }
            //         }
            //     }
            // }
        }

        else {
            return false
        }
    }

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
                    
                    <h1>Data User</h1>
                    <hr />

                    { list.length == 0 ? <p>Data tidak ditemukan</p> : <table className='table'><thead><tr><td>Id</td><td>Username</td><td>Nama Lengkap</td><td>Email</td><td>Role</td><td></td><td></td></tr></thead><tbody>{ list.map((item) => <tr key={item.id}><td>{item.id}</td><td>{item.username}</td><td>{item.full_name}</td><td>{item.email}</td><td>{item.role_name.name}</td><td><Link href={`/dashboard/users/${item.id}/edit`}><img className='iconDel' src='/images/icon-edit.png' alt='edit' /></Link></td><td><img className='iconDel' src='/images/icon-del.png' alt='delete' onClick={(event) => handleDelete(event, item.id)}/></td></tr>) }</tbody></table> }

                    <Link className={style.btn} href='/dashboard/users/create'>
                        <button className={`btn blue-btn ${style.btnCreate}`}>Tambah User</button>
                    </Link>
                </main>
            </div>

            <Footer />
        </div>
    )
}