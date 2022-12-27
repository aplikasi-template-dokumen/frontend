import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Navbar from '../../../../components/Navbar'
import Footer from '../../../../components/Footer'
import style from '../../../../styles/Profile.module.css'

export default function DashboardEditSubCategory() {
    const router = useRouter()

    const [name, setName] = useState(null)
    const [order, setOrder] = useState(null)
    const [catList, setCatList] = useState([])
    const [catId, setCatId] = useState(-1)

    useEffect(() => {
        const t = typeof window !== 'undefined' ? window.localStorage.getItem('t') : {}

        if (t == null) {
            router.push('/')
        }

        else {            
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/c`)
                .then((res) => res.json())
                .then((val) => {
                    setCatList(val.data)
                })
        }
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sc/create?token=${window.localStorage.getItem('t')}`, {
                name,
                order,
                category_id: catId
            })

            if (response) {
                router.push('/dashboard/categories')
            }
        }

        catch(err) {
            console.log(err)
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
                    <Link className='backBtn' href={'/dashboard/categories'}><img src='/images/icon-back.png' alt='icon' className='backImg' />Kembali ke Halaman Kategori</Link>
                </main>

                <div className={style.container}>
                    <p>Nama Kategori</p>
                        { catList.length == 0 ? <select value={-1}><option value={-1}>Loading...</option></select> : <select value={catId} onChange={(e) => setCatId(e.target.value)}> <option value={-1}>Pilih Kategori</option> {catList.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)} </select> }
                    
                    <p>Nama Sub Kategori</p>
                    <input id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} required />
                    
                    <p>Order</p>
                    <input id='order' type='number' value={order} onChange={(e) => setOrder(e.target.value)} required />

                    <div className={style.btn}>
                        <Link onClick={(event) => handleSubmit(event)} href={`#`} className={`btn blue-btn ${style.button} ${style.fullWidth}`}>Simpan</Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}