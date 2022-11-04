import Navbar from '../components/Navbar'
import style from '../styles/Sign.module.css'
import Link from 'next/link'

export default function SignUpPage() {
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

                <button id='daftar'>Daftar</button>
                <p className={style.center}>Sudah punya akun?<Link href='/login'>Masuk</Link></p>
            </form>
        </div>
        </>
    )
}