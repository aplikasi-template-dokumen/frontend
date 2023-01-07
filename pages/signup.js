import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import style from '../styles/Sign.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function SignUpPage() {
    const router = useRouter()
    
    const [occs, setOccs] = useState([])
    
    useEffect(() => {
        const token = typeof window !== 'undefined' ? window.localStorage.getItem('t') : {}
        
        if (token) {
            router.push(`/${user}`)
        }

        else {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/o`)
                .then((res) => res.json())
                .then((data) => {
                    setOccs(data.data)
                })
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/u/regist`, {
                email: document.getElementById('email').value,
                name: document.getElementById('name').value,
                uname: document.getElementById('username').value,
                occ_id: parseInt(document.getElementById('occupation').value),
                pass: document.getElementById('pass').value,
                repass: document.getElementById('confirm-pass').value
            })
            .then((val) => {
                window.localStorage.setItem('i', val.data.data.id)
                window.localStorage.setItem('u', val.data.data.username)
                window.localStorage.setItem('r', val.data.data.role)
                
                console.log(val.data.message)
                // router.push({ pathname: `/` })
                router.push({ pathname: `/login` })
            })
        }
        
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={style.body}>
            <Head>
                <title>TemplateKita</title>
                <meta name="description" content="TemplateKita" />
                <link rel="icon" href="/tab-icon.png" />
            </Head>
            
            <Navbar/>
            <div className={style.container}>
                <h1>Registrasi Akun</h1>

                <form className={style.form}>
                    <p>Email <span>*</span></p>
                    <input type='email' id='email' placeholder='example@mail.com' required/>

                    <p>Nama Lengkap <span>*</span></p>
                    <input type='text' id='name' placeholder='user123' required/>

                    <p>Username <span>*</span></p>
                    <input type='text' id='username' placeholder='user123' required/>

                    <p>Pekerjaan <span>*</span></p>
                    <select id='occupation' required>
                        <option value={0}>Pilih Pekerjaan</option>
                        { occs.length == 0 ? <option>Loading...</option> : occs.map((item) => <option key={item.id} value={item.id}>{item.name}</option>) }
                    </select>

                    <p>Password <span>*</span></p>
                    <input type='password' id='pass' required/>

                    <p>Konfirmasi Password <span>*</span></p>
                    <input type='password' id='confirm-pass' required/>

                    <p className={style.note}><span>*</span>wajib diisi</p>

                    <button id='daftar' onClick={(event) => handleSubmit(event)}>Daftar</button>
                    <p className={style.center}>Sudah punya akun?<Link href='/login'>Masuk</Link></p>
                </form>
            </div>
            <Footer/>
        </div>
    )
}