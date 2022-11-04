import style from '../styles/Navbar.module.css';
import Link from 'next/link'

export default function Navbar() {
    return (
        <div className={style.container}>
            <div className={style.left}>
                <img src='/favicon.ico' />
                <Link href='/'>TemplateKita</Link>
            </div>

            <div className={style.right}>
                <Link href='/login'>Masuk</Link>
                <Link href='/signup'>Registrasi</Link>
            </div>
        </div>
    )
}