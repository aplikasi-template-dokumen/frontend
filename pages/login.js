import Navbar from '../components/Navbar'
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
            router.push(`/${user}`)
        }

        //axios here
    })


    const handleSubmit = async (e, uname, pass) => {
        e.preventDefault()
        // console.log('uname: ', uname, ' pass: ', pass)

        try {
            const response = await axios.post('http://127.0.0.1:3001/u/login', {
                uname: uname,
                pass: pass
            })
            .then((val) => {
                // console.log('Response: ', val.data.data)
                window.localStorage.setItem('u', val.data.data.username)
                console.log(val.data.message)
                router.push({ pathname: `/${val.data.data.username}` })
            })
        }

        catch(err) {
            console.log(err)
        }
    }

    return (
        <>
        <Navbar/>
        <div className={style.container}>
            <h1>Masuk</h1>

            <form className={style.form}>
                <p>Username <span>*</span></p>
                <input type='text' id='uname' placeholder='user123' required/>

                <p>Password <span>*</span></p>
                <input type='password' id='pass' required/>

                <p className={style.note}><span>*</span>wajib diisi</p>

                <button onClick={(event) => handleSubmit(event, document.getElementById('uname').value, document.getElementById('pass').value)} id='daftar'>Masuk</button>
                <p className={style.center}>Belum punya akun?<Link href='/signup'>Daftar di sini</Link></p>
            </form>
        </div>
        </>
    )
}