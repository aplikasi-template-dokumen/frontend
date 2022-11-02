import style from '../styles/Navbar.module.css';

export default function NavbarLogin() {
    return (
        <div className={style.container}>
            <div className={`${style.left} ${style.leftLogin}`}>
                <img src='/favicon.ico' />
                <a href='/'>TemplateKita</a>
            </div>

            <div className={`${style.left} ${style.rightLogin}`}>
                <img src='/images/sample-profile.png' />
                <a>rahmams68</a>
            </div>

            <nav>
                <div>
                    <img src='/images/icon-menu.png' alt='menu' title='Menu' />

                    <img src='/images/icon-home.png' alt='home' title='Halaman Utama' />
                    
                    <hr />
                    <img src='/images/icon-document.png' alt='document' title='Dokumen Saya' />
                    <img src='/images/icon-template.png' alt='template' title='Template Saya' />
                    <img src='/images/icon-paper.png' alt='submission' title='Template Diajukan' />
                    
                    <hr />
                    <img src='/images/icon-dashboard.png' alt='dashboard' title='Dashboard Admin' />
                    <hr />
                    <img src='/images/icon-user.png' alt='profile' title='Profil' />
                    <a href='/'><img src='/images/icon-logout.png' alt='logout' title='Keluar' /></a>
                </div>

                <div className={style.menuList}>
                    {/* <a>Halaman Utama</a>
                    <p>Dokumen Saya</p>
                    <p>Template Saya</p>
                    <p>Daftar Template Diajukan</p>
                    <p>Dashboard Admin</p>
                    <p>Profil</p>
                    <p>Keluar</p> */}
                </div>
            </nav>
        </div>
    )
}