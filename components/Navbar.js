import style from '../styles/Navbar.module.css';
import styleLogin from '../styles/NavbarLogin.module.css';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Navbar() {
    const id = typeof window !== 'undefined' ? window.localStorage.getItem('i') : {}
    // console.log(id)

    if (id == null) {
        // console.log(id, 'Tidak login')
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

    else {
        // console.log(id, 'login')

        const [menu, setMenu] = useState(styleLogin.hide)
        const router = useRouter()

        const changeDisplay = (e) => {
            e.preventDefault()

            if (menu == styleLogin.hide) {
                setMenu(styleLogin.show)
            }

            else {
                setMenu(styleLogin.hide)
            }
        }

        const logout = async () => {
            // window.localStorage.removeItem('u')
            window.localStorage.clear()
            router.push('/')
        }

        return (
            <div className={styleLogin.container}>
                <div className={`${styleLogin.left} ${styleLogin.leftLogin}`}>
                    <img src='/favicon.ico' />
                    <Link href={``}>TemplateKita</Link>
                </div>
    
                <div className={`${styleLogin.left} ${styleLogin.rightLogin}`}>
                    <img src='/images/sample-profile.png' />
                    <a>rahmams68</a>
                </div>
    
                <nav>
                    <div>
                        <Link onClick={(event) => changeDisplay(event)} href='/' className={styleLogin.link}>
                            <img src='/images/icon-menu.png' alt='menu' title='Menu' />
                            {/* <p className={menu}>Menu</p> */}
                        </Link>
    
                        <Link href={`/`} className={styleLogin.link}>
                            <img src='/images/icon-home.png' alt='home' title='Halaman Utama' />
                            <p className={menu}>Halaman Utama</p>
                        </Link>
                        
                        <hr />
                        <Link href={`/dokumen-saya`} className={styleLogin.link}>
                            <img src='/images/icon-document.png' alt='document' title='Dokumen Saya' />
                            <p className={menu}>Dokumen Saya</p>
                        </Link>
                        <Link href={`/template-saya`} className={styleLogin.link}>
                            <img src='/images/icon-template.png' alt='template' title='Template Saya' />
                            <p className={menu}>Template Saya</p>
                        </Link>
                        <Link href={`/daftar-ajuan`} className={styleLogin.link}>
                            <img src='/images/icon-paper.png' alt='submission' title='Template Diajukan' />
                            <p className={menu}>Daftar Template Ajuan</p>
                        </Link>
                        
                        <hr />
                        
                        <Link href={`/dashboard`} className={styleLogin.link}>
                            <img src='/images/icon-dashboard.png' alt='dashboard' title='Dashboard Admin' />
                            <p className={menu}>Dashboard Admin</p>
                        </Link>
                        <hr />
                        
                        <Link href={`/profil`} className={styleLogin.link}>
                            <img src='/images/icon-user.png' alt='profile' title='Profil' />
                            <p className={menu}>Profil</p>
                        </Link>
                        
                        <Link href='/' className={styleLogin.link} onClick={() => logout()}>
                            <img src='/images/icon-logout.png' alt='logout' title='Keluar' />
                            <p className={menu}>Keluar</p>
                        </Link>
                    </div>
                </nav>
            </div>
        )
    }

}