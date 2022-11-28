import style from '../../../styles/Profile.module.css'
import NavbarLogin from "../../../components/NavbarLogin"
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function GantiPassword() {
    const user = typeof window !== 'undefined' ? window.localStorage.getItem('u') : {}
    const router = useRouter()

    useEffect(() => {
        if (user === null) {
            router.push(`/`)
        }
    })

    return (
        <>
            <NavbarLogin />

            <div className={style.container}>
                <img src='/images/sample-profile.png' alt='profile' />

                <p>Password Lama</p>
                <input type='password' required />

                <p>Password Baru</p>
                <input type='password' required />

                <p>Konfirmasi Password Baru</p>
                <input type='password' required />
                
                <div className={style.btn}>
                <Link href={`#`} className={`${style.button} ${style.fullWidth}`}>Simpan</Link>
                </div>
            </div>
        </>
    )
}