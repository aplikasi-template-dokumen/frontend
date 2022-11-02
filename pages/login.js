import Navbar from '../components/Navbar'
import style from '../styles/Sign.module.css'

export default function LoginPage() {
    return (
        <>
        <Navbar/>
        <div className={style.container}>
            <h1>Masuk</h1>

            <form className={style.form}>
                <p>Username <span>*</span></p>
                <input type='text' id='username' placeholder='user123'/>

                <p>Password <span>*</span></p>
                <input type='password' id='pass'/>

                <p className={style.note}><span>*</span>wajib diisi</p>

                <button id='daftar'>Masuk</button>
                <p className={style.center}>Belum punya akun?<a href='/signup'>Daftar di sini</a></p>
            </form>
        </div>
        </>
    )
}