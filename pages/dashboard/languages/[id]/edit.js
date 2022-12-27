import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Navbar from '../../../../components/Navbar'
import Footer from '../../../../components/Footer'
import style from '../../../../styles/Profile.module.css'

export default function DashboardEditLanguage() {
    const router = useRouter()

    const [name, setName] = useState(null)
    const [order, setOrder] = useState(0)

    useEffect(() => {
        const t = typeof window !== 'undefined' ? window.localStorage.getItem('t') : {}

        if (t == null) {
            router.push('/')
        }

        else {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/l/${router.query.id}`)
                .then((res) => res.json())
                .then((val) => {
                    setName(val.data.name)
                    setOrder(val.data.order)
                })
        }
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/l/${router.query.id}/edit?token=${window.localStorage.getItem('t')}`, {
                name,
                order
            })

            if (response) {
                router.push('/dashboard/languages')
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
                    <Link className='backBtn' href={'/dashboard/languages'}><img src='/images/icon-back.png' alt='icon' className='backImg' />Kembali ke Halaman Bahasa</Link>
                </main>

                <div className={style.container}>
                    <p>Nama Bahasa</p>
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