import style from '../../../styles/Documents.module.css'
import NavbarLogin from '../../../components/NavbarLogin'
import Link from 'next/link'

export default function DetailTemplateLogin() {
    return (
        <>
            <NavbarLogin />

            <div className={style.container}>
                <div className={style.document}>
                </div>
                
                <div className={style.action}>
                    <p>Judul Template</p>
                    <Link href='/'><button>Gunakan Template</button></Link>
                    <Link href='/'><button>Unduh Template (.doc)</button></Link>
                </div>
            </div>
        </>
    )
}