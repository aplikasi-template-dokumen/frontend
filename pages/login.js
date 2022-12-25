import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import style from '../styles/Sign.module.css'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function LoginPage() {
    const user = typeof window !== 'undefined' ? window.localStorage.getItem('u') : {}
    const router = useRouter()

    useEffect(() => {
        if (user !== null) {
            router.push(`/`)
        }
    })


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/u/login`, {
                uname: document.getElementById('uname').value,
                pass: document.getElementById('pass').value
            })
            .then((val) => {
                window.localStorage.setItem('t', val.data.token)

                console.log(val.data.message)
                router.push({ pathname: `/` })
            })
        }

        catch(err) {
            console.log(err)
        }
    }

    return (
        <div className='body'>
            <Head>
                <title>TemplateKita</title>
                <meta name="description" content="TemplateKita" />
                <link rel="icon" href="/tab-icon.png" />
            </Head>

            <Navbar/>
            <div className={style.container}>
                <h1>Masuk</h1>

                <form className={style.form}>
                    <p>Username <span>*</span></p>
                    <input type='text' id='uname' placeholder='user123' required/>

                    <p>Password <span>*</span></p>
                    <input type='password' id='pass' required/>

                    <p className={style.note}><span>*</span>wajib diisi</p>

                    <button onClick={(event) => handleSubmit(event)} id='daftar'>Masuk</button>
                    <p className={style.center}>Belum punya akun?<Link href='/signup'>Daftar di sini</Link></p>
                </form>
            </div>
            <Footer/>
        </div>
    )
}