import style from '../styles/Navbar.module.css';
import styleLogin from '../styles/NavbarLogin.module.css';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const [status, setStatus] = useState()
    const [uname, setUname] = useState()
    const [role, setRole] = useState()
    const [menu, setMenu] = useState(styleLogin.hide)
    const router = useRouter()
    
    useEffect(() => {
        const id = typeof window !== 'undefined' ? window.localStorage.getItem('i') : {}
        const uname = window.localStorage.getItem('u')
        const role = typeof window !== 'undefined' ? window.localStorage.getItem('r') : {}
        setStatus(id)
        setUname(uname)
        setRole(role)
    }, [])

    if (status == null) {
        return (
            <div className={style.container}>
                <div className={style.left}>
                    <img src='/favicon.ico' alt='logo' />
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
            window.localStorage.clear()
            router.reload({ pathname: '/' })
        }

        if (role == 1) {
            return (
                <div className={styleLogin.container}>
                    <div className={`${styleLogin.left} ${styleLogin.leftLogin}`}>
                        <img src='/favicon.ico' alt='logo' />
                        <Link href={`/`}>TemplateKita</Link>
                    </div>
        
                    <div className={`${styleLogin.left} ${styleLogin.rightLogin}`}>
                        <img src='/images/sample-profile.png' alt='profile' />
                        <a>{uname}</a>
                    </div>
        
                    <nav>
                        <div>
                            <Link onClick={(event) => changeDisplay(event)} href='/' className={styleLogin.link}>
                                <img src='/images/icon-menu.png' alt='menu' title='Menu' />
                            </Link>
        
                            <Link href={`/`} className={styleLogin.link}>
                                <img src='/images/icon-home.png' alt='home' title='Halaman Utama' />
                                <p className={menu}>Halaman Utama</p>
                            </Link>
                            
                            {/* <hr /> */}

                            <Link href={`/my/documents`} className={styleLogin.link}>
                                <img src='/images/icon-document.png' alt='document' title='Dokumen Saya' />
                                <p className={menu}>Dokumen Saya</p>
                            </Link>
                            
                            {/* <hr /> */}
                            
                            <Link href={`/profile`} className={styleLogin.link}>
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

        else
        if (role == 2) {
            return (
                <div className={styleLogin.container}>
                    <div className={`${styleLogin.left} ${styleLogin.leftLogin}`}>
                        <img src='/favicon.ico' alt='logo' />
                        <Link href={`/`}>TemplateKita</Link>
                    </div>
        
                    <div className={`${styleLogin.left} ${styleLogin.rightLogin}`}>
                        <img src='/images/sample-profile.png' alt='profile' />
                        <a>{uname}</a>
                    </div>
        
                    <nav>
                        <div>
                            <Link onClick={(event) => changeDisplay(event)} href='/' className={styleLogin.link}>
                                <img src='/images/icon-menu.png' alt='menu' title='Menu' />
                            </Link>
        
                            <Link href={`/`} className={styleLogin.link}>
                                <img src='/images/icon-home.png' alt='home' title='Halaman Utama' />
                                <p className={menu}>Halaman Utama</p>
                            </Link>
                            
                            <hr />
                            <Link href={`/my/documents`} className={styleLogin.link}>
                                <img src='/images/icon-document.png' alt='document' title='Dokumen Saya' />
                                <p className={menu}>Dokumen Saya</p>
                            </Link>
                            <Link href={`/my/templates`} className={styleLogin.link}>
                                <img src='/images/icon-template.png' alt='template' title='Template Saya' />
                                <p className={menu}>Template Saya</p>
                            </Link>
                            
                            <hr />
                            
                            <Link href={`/profile`} className={styleLogin.link}>
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

        else
        if (role == 3) {
            return (
                <div className={styleLogin.container}>
                    <div className={`${styleLogin.left} ${styleLogin.leftLogin}`}>
                        <img src='/favicon.ico' alt='logo' />
                        <Link href={`/`}>TemplateKita</Link>
                    </div>
        
                    <div className={`${styleLogin.left} ${styleLogin.rightLogin}`}>
                        <img src='/images/sample-profile.png' alt='profile' />
                        <a>{uname}</a>
                    </div>
        
                    <nav>
                        <div>
                            <Link onClick={(event) => changeDisplay(event)} href='/' className={styleLogin.link}>
                                <img src='/images/icon-menu.png' alt='menu' title='Menu' />
                            </Link>
        
                            <Link href={`/`} className={styleLogin.link}>
                                <img src='/images/icon-home.png' alt='home' title='Halaman Utama' />
                                <p className={menu}>Halaman Utama</p>
                            </Link>
                            
                            <hr />
                            <Link href={`/my/documents`} className={styleLogin.link}>
                                <img src='/images/icon-document.png' alt='document' title='Dokumen Saya' />
                                <p className={menu}>Dokumen Saya</p>
                            </Link>
                            <Link href={`/my/templates`} className={styleLogin.link}>
                                <img src='/images/icon-template.png' alt='template' title='Template Saya' />
                                <p className={menu}>Template Saya</p>
                            </Link>
                            <Link href={`/submissions`} className={styleLogin.link}>
                                <img src='/images/icon-paper.png' alt='submission' title='Template Diajukan' />
                                <p className={menu}>Daftar Template Ajuan</p>
                            </Link>
                            
                            {/* <hr /> */}
                            
                            <Link href={`/profile`} className={styleLogin.link}>
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

        else
        if (role == 4) {
            return (
                <div className={styleLogin.container}>
                    <div className={`${styleLogin.left} ${styleLogin.leftLogin}`}>
                        <img src='/favicon.ico' alt='logo' />
                        <Link href={`/`}>TemplateKita</Link>
                    </div>
        
                    <div className={`${styleLogin.left} ${styleLogin.rightLogin}`}>
                        <img src='/images/sample-profile.png' alt='profile' />
                        <a>{uname}</a>
                    </div>
        
                    <nav>
                        <div>
                            <Link onClick={(event) => changeDisplay(event)} href='/' className={styleLogin.link}>
                                <img src='/images/icon-menu.png' alt='menu' title='Menu' />
                            </Link>
        
                            <Link href={`/`} className={styleLogin.link}>
                                <img src='/images/icon-home.png' alt='home' title='Halaman Utama' />
                                <p className={menu}>Halaman Utama</p>
                            </Link>
                            
                            <hr />
                            <Link href={`/my/documents`} className={styleLogin.link}>
                                <img src='/images/icon-document.png' alt='document' title='Dokumen Saya' />
                                <p className={menu}>Dokumen Saya</p>
                            </Link>
                            <Link href={`/my/templates`} className={styleLogin.link}>
                                <img src='/images/icon-template.png' alt='template' title='Template Saya' />
                                <p className={menu}>Template Saya</p>
                            </Link>
                            <Link href={`/submissions`} className={styleLogin.link}>
                                <img src='/images/icon-paper.png' alt='submission' title='Template Diajukan' />
                                <p className={menu}>Daftar Template Ajuan</p>
                            </Link>
                            
                            <hr />
                            
                            <Link href={`/dashboard`} className={styleLogin.link}>
                                <img src='/images/icon-dashboard.png' alt='dashboard' title='Dashboard Admin' />
                                <p className={menu}>Dashboard Admin</p>
                            </Link>
                            <hr />
                            
                            <Link href={`/profile`} className={styleLogin.link}>
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

}