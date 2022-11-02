import style from '../styles/Navbar.module.css';

export default function Navbar() {
    return (
        <div className={style.container}>
            <div className={style.left}>
                <img src='/favicon.ico' />
                <a href='/'>TemplateKita</a>
            </div>

            <div className={style.right}>
                <a href='/login'>Masuk</a>
                <a href='/signup'>Registrasi</a>
            </div>
        </div>
    )
}