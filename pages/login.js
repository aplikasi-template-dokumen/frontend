import Navbar from '../components/Navbar'
import style from '../styles/Sign.module.css'
import Link from 'next/link'

export default function LoginPage() {
    return (
        <>
        <Navbar/>
        <div className={style.container}>
            <h1>Masuk</h1>

            <form className={style.form}>
                <p>Username <span>*</span></p>
                <input type='text' id='uname' placeholder='user123'/>

                <p>Password <span>*</span></p>
                <input type='password' id='pass'/>

                <p className={style.note}><span>*</span>wajib diisi</p>

                <button id='daftar'>Masuk</button>
                <p className={style.center}>Belum punya akun?<Link href='/signup'>Daftar di sini</Link></p>
            </form>
        </div>
        </>
    )
}