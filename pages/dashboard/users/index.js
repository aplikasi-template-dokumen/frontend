import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import style from '../../../styles/Admin.module.css'

export default function DashboardUsers() {
    const [list, setList] = useState([])
    
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/u?r=ad`)
            .then((res) => res.json())
            .then((data) => {
                setList(data.data)
            })
    }, [])

    return(
        <>
            <Head>
                <title>TemplateKita</title>
            </Head>

            <Navbar />

            <div className='main-container'>
                <main>
                    <Link className='backBtn' href='/dashboard'><img src='/images/icon-back.png' alt='back-btn' className='backImg' />Kembali ke Dashboard Admin</Link>
                    
                    <h1>Data User</h1>
                    <hr />

                    { list.length == 0 ? <p>Data tidak ditemukan</p> : <table className='table'><thead><tr><td>Id</td><td>Username</td><td>Nama Lengkap</td><td>Email</td><td>Status</td><td></td><td></td></tr></thead><tbody>{ list.map((item) => <tr key={item.id}><td>{item.id}</td><td>{item.username}</td><td>{item.full_name}</td><td>{item.email}</td><td>{item.status}</td><td><img className='iconDel' src='/images/icon-edit.png' alt='edit' /></td><td><img className='iconDel' src='/images/icon-del.png' alt='delete' /></td></tr>) }</tbody></table> }

                    <Link className={style.btn} href='/users/create'>
                        <button className={`btn blue-btn ${style.btnCreate}`}>Tambah User</button>
                    </Link>
                </main>
            </div>
        </>
    )
}