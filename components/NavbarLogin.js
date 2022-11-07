import style from '../styles/NavbarLogin.module.css';
import Link from 'next/link'
import { useState } from 'react';

export default function NavbarLogin() {
    const [menu, setMenu] = useState(style.hide)

    const changeDisplay = (e) => {
        e.preventDefault()

        if (menu == style.hide) {
            setMenu(style.show)
        }

        else {
            setMenu(style.hide)
        }
    }

    return (
        <div className={style.container}>
            <div className={`${style.left} ${style.leftLogin}`}>
                <img src='/favicon.ico' />
                <Link href='/'>TemplateKita</Link>
            </div>

            <div className={`${style.left} ${style.rightLogin}`}>
                <img src='/images/sample-profile.png' />
                <a>rahmams68</a>
            </div>

            <nav>
                <div>
                    <Link onClick={(event) => changeDisplay(event)} href='/' className={style.link}>
                        <img src='/images/icon-menu.png' alt='menu' title='Menu' />
                        {/* <p className={menu}>Menu</p> */}
                    </Link>

                    <Link href='/rahmams' className={style.link}>
                        <img src='/images/icon-home.png' alt='home' title='Halaman Utama' />
                        <p className={menu}>Halaman Utama</p>
                    </Link>
                    
                    <hr />
                    <Link href='/rahmams/dokumen-saya' className={style.link}>
                        <img src='/images/icon-document.png' alt='document' title='Dokumen Saya' />
                        <p className={menu}>Dokumen Saya</p>
                    </Link>
                    <Link href='/rahmams/template-saya' className={style.link}>
                        <img src='/images/icon-template.png' alt='template' title='Template Saya' />
                        <p className={menu}>Template Saya</p>
                    </Link>
                    <Link href='/rahmams/daftar-ajuan' className={style.link}>
                        <img src='/images/icon-paper.png' alt='submission' title='Template Diajukan' />
                        <p className={menu}>Daftar Template Ajuan</p>
                    </Link>
                    
                    <hr />
                    
                    <Link href='/rahmams/dashboard' className={style.link}>
                        <img src='/images/icon-dashboard.png' alt='dashboard' title='Dashboard Admin' />
                        <p className={menu}>Dashboard Admin</p>
                    </Link>
                    <hr />
                    
                    <Link href='/rahmams/profil' className={style.link}>
                        <img src='/images/icon-user.png' alt='profile' title='Profil' />
                        <p className={menu}>Profil</p>
                    </Link>
                    
                    <Link href='/' className={style.link}>
                        <img src='/images/icon-logout.png' alt='logout' title='Keluar' />
                        <p className={menu}>Keluar</p>
                    </Link>
                </div>
            </nav>
        </div>
    )
}