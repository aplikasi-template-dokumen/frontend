import Navbar from '../components/Navbar'
import style from '../styles/Sign.module.css'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function SignUpPage() {
    const user = typeof window !== 'undefined' ? window.localStorage.getItem('u') : {}
    const router = useRouter()

    useEffect(() => {
        if (user !== null) {
            router.push(`/${user}`)
        }

        //axios here
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://127.0.0.1:3001/users/create', {
                email: 'rumika@gmail.com',
                name: 'Rumika Damayanti Mariani Sitohang',
                uname: 'rumikadms',
                pass: '333333',
                repass: '333333',
                occ_id: 0,
                aff: 'Politeknik Negeri Jakarta',
                img: '/images/sample-profile.png',
                role: 'user'
            })
            .then((val) => {
                window.localStorage.setItem('u', val.data.username)
                console.log(val.data.message)
                router.push({ pathname: `/${val.data.username}` })
            })
        }
        
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
        <Navbar/>
        <div className={style.container}>
            <h1>Registrasi Akun</h1>

            <form className={style.form}>
                <p>Email <span>*</span></p>
                <input type='email' id='email' placeholder='example@mail.com' required/>

                <p>Nama Lengkap <span>*</span></p>
                <input type='text' id='nama' placeholder='user123' required/>

                <p>Username <span>*</span></p>
                <input type='text' id='username' placeholder='user123' required/>

                <p>Pekerjaan</p>
                <select id='occupation'>
                    <option>Pilih Pekerjaan</option>
                    <option>Pelajar</option>
                    <option>Guru</option>
                    <option>Lainnya</option>
                </select>

                <p>Password <span>*</span></p>
                <input type='password' id='pass'/>

                <p>Konfirmasi Password <span>*</span></p>
                <input type='password' id='confirm-pass'/>

                <p className={style.note}><span>*</span>wajib diisi</p>

                <button id='daftar' onClick={(event) => handleSubmit(event)}>Daftar</button>
                <p className={style.center}>Sudah punya akun?<Link href='/login'>Masuk</Link></p>
            </form>
        </div>
        </>
    )
}