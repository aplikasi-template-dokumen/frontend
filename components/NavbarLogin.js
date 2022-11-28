import style from '../styles/NavbarLogin.module.css';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function NavbarLogin() {
    const user = typeof window !== 'undefined' ? window.localStorage.getItem('u') : {}
    // console.log('user: ', user)

    const [menu, setMenu] = useState(style.hide)
    const router = useRouter()

    const changeDisplay = (e) => {
        e.preventDefault()

        if (menu == style.hide) {
            setMenu(style.show)
        }

        else {
            setMenu(style.hide)
        }
    }

    const logout = async () => {
        // window.localStorage.removeItem('u')
        window.localStorage.clear()
        router.push('/')
    }

    return (
        <div className={style.container}>
            <div className={`${style.left} ${style.leftLogin}`}>
                <img src='/favicon.ico' alt='logo' />
                <Link href={`/${user}`}>TemplateKita</Link>
            </div>

            <div className={`${style.left} ${style.rightLogin}`}>
                <img src='/images/sample-profile.png' alt='profile' />
                <a>rahmams68</a>
            </div>

            <nav>
                <div>
                    <Link onClick={(event) => changeDisplay(event)} href='/' className={style.link}>
                        <img src='/images/icon-menu.png' alt='menu' title='Menu' />
                        {/* <p className={menu}>Menu</p> */}
                    </Link>

                    <Link href={`/${user}`} className={style.link}>
                        <img src='/images/icon-home.png' alt='home' title='Halaman Utama' />
                        <p className={menu}>Halaman Utama</p>
                    </Link>
                    
                    <hr />
                    <Link href={`/${user}/dokumen-saya`} className={style.link}>
                        <img src='/images/icon-document.png' alt='document' title='Dokumen Saya' />
                        <p className={menu}>Dokumen Saya</p>
                    </Link>
                    <Link href={`/${user}/template-saya`} className={style.link}>
                        <img src='/images/icon-template.png' alt='template' title='Template Saya' />
                        <p className={menu}>Template Saya</p>
                    </Link>
                    <Link href={`/${user}/daftar-ajuan`} className={style.link}>
                        <img src='/images/icon-paper.png' alt='submission' title='Template Diajukan' />
                        <p className={menu}>Daftar Template Ajuan</p>
                    </Link>
                    
                    <hr />
                    
                    <Link href={`/${user}/dashboard`} className={style.link}>
                        <img src='/images/icon-dashboard.png' alt='dashboard' title='Dashboard Admin' />
                        <p className={menu}>Dashboard Admin</p>
                    </Link>
                    <hr />
                    
                    <Link href={`/${user}/profil`} className={style.link}>
                        <img src='/images/icon-user.png' alt='profile' title='Profil' />
                        <p className={menu}>Profil</p>
                    </Link>
                    
                    <Link href='/' className={style.link} onClick={() => logout()}>
                        <img src='/images/icon-logout.png' alt='logout' title='Keluar' />
                        <p className={menu}>Keluar</p>
                    </Link>
                </div>
            </nav>
        </div>
    )
}