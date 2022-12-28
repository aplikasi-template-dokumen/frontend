import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import style from '../../../styles/Admin.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function DashboardCategories() {
    const router = useRouter()

    const [catList, setCatList] = useState([])
    const [subList, setSubList] = useState([])
    const [display, setDisplay] = useState(['show', 'hide'])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/c`)
            .then((res) => res.json())
            .then((data) => {
                setCatList(data.data)
            })
        
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/sc`)
            .then((res) => res.json())
            .then((data) => {
                setSubList(data.data)
            })
    }, [])

    const handleDelete = async (e, id, key) => {
        if (confirm('Hapus kategori/sub kategori ini?')) {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/${key}/${id}/delete?token=${window.localStorage.getItem('t')}`)

            if (response) {
                router.reload()
            }
        }
    }

    return(
        <div className='body'>
            <Head>
                <title>TemplateKita</title>
                <meta name="description" content="TemplateKita" />
                <link rel="icon" href="/tab-icon.png" />
            </Head>
            
            <Head>
                <title>TemplateKita</title>
            </Head>
            
            <Navbar />
            
            <div className='main-container'>
                <main>
                    <Link className='backBtn' href='/dashboard'><img src='/images/icon-back.png' alt='back-btn' className='backImg' />Kembali ke Dashboard Admin</Link>

                    <h1>Daftar Kategori dan Sub Kategori</h1>
                    <hr />

                    <button onClick={(e) => setDisplay(['show', 'hide'])} className={display[0] == 'show' ? `btn blue-btn ${style.btnDisplay}` : `btn ${style.btnDisplay}`}>Kategori</button>
                    <button onClick={(e) => setDisplay(['hide', 'show'])} className={display[1] == 'show' ? `btn blue-btn ${style.btnDisplay}` : `btn ${style.btnDisplay}`}>Sub Kategori</button>

                    <div className={display[0]}>
                        {/* { catList.length == 0 ? <p>Data tidak ditemukan</p> : <table className='table'><thead><tr><td>Id</td><td>Nama Kategori</td><td>Jumlah Sub Kategori</td><td></td><td></td></tr></thead><tbody>{ catList.map((item) => <tr key={item.id}><td>{item.id}</td><td>{item.name}</td><td>{item.id}</td><td><Link href={`/dashboard/categories/${item.id}/edit`}><img className='iconDel' src='/images/icon-edit.png' alt='edit' /></Link></td><td><img className='iconDel' src='/images/icon-del.png' alt='delete' onClick={((event) => handleDelete(event, item.id, 'c'))} /></td></tr>) }</tbody></table> } */}
                        { catList.length == 0 ? <p>Data tidak ditemukan</p> : <table className='table'><thead><tr><td>Id</td><td>Nama Kategori</td><td></td><td></td></tr></thead><tbody>{ catList.map((item) => <tr key={item.id}><td>{item.id}</td><td>{item.name}</td><td><Link href={`/dashboard/categories/${item.id}/edit`}><img className='iconDel' src='/images/icon-edit.png' alt='edit' /></Link></td><td><img className='iconDel' src='/images/icon-del.png' alt='delete' onClick={((event) => handleDelete(event, item.id, 'c'))} /></td></tr>) }</tbody></table> }

                        <Link className={style.btn} href='/dashboard/categories/create'>
                            <button className={`btn blue-btn ${style.btnCreate}`}>Tambah Kategori</button>
                        </Link>
                    </div>
                    
                    <div className={display[1]}>
                        { subList.length == 0 ? <p>Data tidak ditemukan</p> : <table className='table'><thead><tr><td>Id</td><td>Nama Sub Kategori</td><td>Kategori</td><td></td><td></td></tr></thead><tbody>{ subList.map((item) => <tr key={item.id}><td>{item.id}</td><td>{item.name}</td><td>{item.category.name}</td><td><Link href={`/dashboard/categories/sub/${item.id}/edit`}><img className='iconDel' src='/images/icon-edit.png' alt='edit' /></Link></td><td><img className='iconDel' src='/images/icon-del.png' alt='delete' onClick={((event) => handleDelete(event, item.id, 'sc'))} /></td></tr>) }</tbody></table> }
                    
                        <Link className={style.btn} href='/dashboard/categories/sub/create'>
                            <button className={`btn blue-btn ${style.btnCreate}`}>Tambah Sub Kategori</button>
                        </Link>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    )
}